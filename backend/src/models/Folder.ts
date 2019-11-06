import IFolder from 'interfaces/Folder'
import { Document, model, Schema } from 'mongoose'
import Bookmark from './Bookmark'

interface IFolderModel extends IFolder, Document {}

const schema = new Schema({
  name: String,
  parentFolderId: [{ type: Schema.Types.ObjectId, ref: 'Folder' }]
})

schema.methods.bookmarks = function() {
  return Bookmark.find({ folderId: this.id })
}

schema.methods.parentFolder = function() {
  return Folder.findById(this.parentFolderId)
}

schema.methods.subFolders = function() {
  return Folder.find({ parentFolderId: this.id })
}

const Folder = model<IFolderModel>('Folder', schema)

export default Folder
