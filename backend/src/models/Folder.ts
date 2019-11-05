import { Schema, model, Document } from 'mongoose'
import IFolder from 'interfaces/Folder'
import Bookmark from './Bookmark'

interface IFolderModel extends IFolder, Document {}

const schema = new Schema({
  name: String,
  subFolders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }]
})

schema.methods.bookmarks = function() {
  return Bookmark.find({ folder: this.id })
}

const Folder = model<IFolderModel>('Folder', schema)

export default Folder
