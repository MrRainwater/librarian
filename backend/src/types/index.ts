import { buildSchema } from 'graphql'
import bookmark from './bookmark'
import folder from './folder'
import metadata from './metadata'
import mutation from './mutation'
import query from './query'

export default buildSchema(
  [query, mutation, bookmark, folder, metadata].join('')
)
