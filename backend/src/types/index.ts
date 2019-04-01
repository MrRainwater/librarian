import { buildSchema } from 'graphql'
import query from './query'
import mutation from './mutation'
import bookmark from './bookmark'
import metadata from './metadata'

export default buildSchema([query, mutation, bookmark, metadata].join(''))
