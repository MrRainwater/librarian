import { Schema, model, Document } from 'mongoose'
import IBookmark from 'interfaces/Bookmark'

interface IBookmarkModel extends IBookmark, Document {}

const schema = new Schema({
  url: String,
  title: String,
  description: String,
  img: String,
  tags: [String],
  folder: { type: Schema.Types.ObjectId, ref: 'Folder' }
})

const User = model<IBookmarkModel>('User', schema)

export default User
