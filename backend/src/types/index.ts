import { buildSchema } from 'graphql'
import query from './query'
import mutation from './mutation'
import bookmark from './bookmark'
import metadata from './metadata'
import folder from './folder'

export default buildSchema(
  [query, mutation, bookmark, folder, metadata].join('')
)
