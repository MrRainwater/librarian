import { IBookmark } from 'interfaces'
import { times } from 'lodash'
import { Factory } from 'rosie'

interface IOptions {
  numTags: number
  numFolders: number
}

export const BookmarkFactory = new Factory<Partial<IBookmark & IOptions>>()
  .sequence('title', (i) => `Bookmark ${i}`)
  .option('numTags', 0)
  // .attr('tags', ['numTags'], (numTags: number) =>
  //   times(numTags, (i) => `Tag ${i}`)
  // )
  .option('numFolders', 0)
  .attrs({
    url: 'url'
    // description: 'desc',
    // img: ''
  })

export default BookmarkFactory
