import { JSDOM } from 'jsdom'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { getMetadata, Metadata } from './scraper'

const html = readFileSync(join(__dirname, '..', 'bookmarks.html')).toString()
const {
  window: { document }
} = new JSDOM(html)

const links = Array.from(document.querySelectorAll('a')).map(link => link.href)

Promise.all(
  links
    .filter(l => l.startsWith('http'))
    .map(l => getMetadata(l).catch(err => console.log(err.code)))
)
  .then(metadata => {
    console.log('done')
    const data = metadata.filter(Boolean).reduce((data, current) => {
      if (current) {
        const { url, title, description, img } = current
        return [...data, { url, title, description, img }]
      } else {
        return data
      }
    }, [])
    writeFileSync(join(__dirname, '..', 'bookmarks.json'), JSON.stringify(data))
  })
  .catch(err => console.error(err))
