import { Schema, model, Document } from 'mongoose'
import IFolder from 'interfaces/Folder'

interface IFolderModel extends IFolder, Document {}

const schema = new Schema({
  name: String,
  subFolders: [{ type: Schema.Types.ObjectId, ref: 'Folder' }]
})

const Folder = model<IFolderModel>('Folder', schema)

export default Folder
