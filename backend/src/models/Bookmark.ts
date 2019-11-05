import { Schema, model, Document } from 'mongoose'
import IBookmark from 'interfaces/Bookmark'
import Folder from './Folder'

interface IBookmarkModel extends IBookmark, Document {}

const schema = new Schema({
  url: String,
  title: String,
  description: String,
  img: String,
  tags: [String],
  folderId: { type: Schema.Types.ObjectId, ref: 'Folder' }
})

schema.methods.folder = function() {
  return Folder.findById(this.folderId)
}

const User = model<IBookmarkModel>('Bookmark', schema)

export default User
