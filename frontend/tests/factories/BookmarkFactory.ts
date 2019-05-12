import { Factory } from 'rosie'
import { IBookmark } from 'interfaces'
import { times } from 'lodash'

interface Options {
  numTags: number
}

export const BookmarkFactory = new Factory<Partial<IBookmark & Options>>()
  .sequence('title', i => `Bookmark ${i}`)
  .option('numTags', 0)
  .attr('tags', ['numTags'], (numTags: number) =>
    times(numTags, i => `Tag ${i}`)
  )
  .attrs({
    url: 'url',
    description: 'desc',
    img: ''
  })
