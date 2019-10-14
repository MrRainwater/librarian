import { Factory } from 'rosie'
import { IBookmark } from 'interfaces'
import { times } from 'lodash'

interface Options {
  numTags: number
  numFolders: number
}

export const BookmarkFactory = new Factory<Partial<IBookmark & Options>>()
  .sequence('title', i => `Bookmark ${i}`)
  .option('numTags', 0)
  .attr('tags', ['numTags'], (numTags: number) =>
    times(numTags, i => `Tag ${i}`)
  )
  .option('numFolders', 0)
  .attr('folders', ['numFolders'], (numFolders: number) =>
    times(numFolders, i => `Folder ${i}`)
  )
  .attrs({
    url: 'url',
    description: 'desc',
    img: ''
  })

export default BookmarkFactory
