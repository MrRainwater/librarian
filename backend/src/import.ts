import { readFileSync, writeFileSync } from 'fs'
import { JSDOM } from 'jsdom'
import { join } from 'path'
import { getMetadata, IMetadata } from './scraper'

/* tslint:disable */

const html = readFileSync(join(__dirname, '..', 'bookmarks.html')).toString()
const {
  window: { document }
} = new JSDOM(html)

const links = Array.from(document.querySelectorAll('a')).map(
  (link) => link.href
)

const metadata: IMetadata[] = []
const total = links.length
let finished = 0
let errors = 0

function progress() {
  console.log(`${finished / total}% complete`)
  console.log(errors, 'errors')
}

function saveData() {
  const data = metadata
    .filter(Boolean)
    .reduce<IMetadata[]>((result, { url, title, description, img }) => {
      return [...result, { url, title, description, img }]
    }, [])
  writeFileSync(join(__dirname, '..', 'bookmarks.json'), JSON.stringify(data))
  process.exit()
}

let timer = setTimeout(saveData, 10000)

function resetTimer() {
  clearTimeout(timer)
  timer = setTimeout(saveData, 10000)
}

Promise.all(
  links
    .filter((l) => l.startsWith('http'))
    .map((l) =>
      getMetadata(l)
        .then((res) => {
          finished += 1
          metadata.push(res)
          resetTimer()
          progress()
        })
        .catch(({ name, statusCode, statusName, code, url }) => {
          finished += 1
          errors += 1
          console.log(
            `${url}:\n${name} : ${statusCode} : ${statusName} : ${code}`
          )
          resetTimer()
          progress()
        })
    )
)
  .then((metadata) => {
    saveData()
  })
  .catch((err) => {
    console.error('ERROR IN PROMISE.ALL')
    saveData()
  })
