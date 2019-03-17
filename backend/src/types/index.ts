import { buildSchema } from 'graphql'
import query from './query'
import bookmark from './bookmark'
import metadata from './metadata'

export default buildSchema([query, bookmark, metadata].join(''))
