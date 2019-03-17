import { buildSchema } from 'graphql'
import query from './query'
import bookmark from './bookmark'

export default buildSchema([query, bookmark].join(''))
