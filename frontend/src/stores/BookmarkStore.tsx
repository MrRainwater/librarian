import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBookmark, IFolder } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'

interface IFolderMap {
  [id: string]: IFolder
}
export interface IState {
  folders: IFolderMap
  currentFolderId: string
}

interface IInitialize {
  folders: IFolder[]
  bookmarks: IBookmark[]
}

interface IOpenFolder {
  folderId: string
}

interface ISetFolder {
  folderId: string
  bookmarks: IBookmark[]
  subFolders: IFolder[]
}

export const initialState: IState = {
  folders: {
    '': {
      id: '',
      name: '',
      bookmarks: [],
      subFolderIds: [],
      parentFolderId: ''
    }
  },
  currentFolderId: ''
}

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<IInitialize>) {
      const { bookmarks, folders } = action.payload
      const globalFolder = state.folders['']!
      globalFolder.bookmarks = bookmarks
      folders.forEach((f) => (state.folders[f.id] = f))
    },
    openFolder(state, action: PayloadAction<IOpenFolder>) {
      const folder = state.folders[action.payload.folderId]!
      state.currentFolderId = folder ? folder.id : state.currentFolderId
    },
    setFolder(state, action: PayloadAction<ISetFolder>) {
      action.payload.subFolders.forEach((f) => (state.folders[f.id] = f))
      const folder = state.folders[action.payload.folderId]!
      state.currentFolderId = folder ? folder.id : state.currentFolderId
      folder.bookmarks = folder.bookmarks
        ? folder.bookmarks
        : action.payload.bookmarks
    }
  }
})

export const { reducer, actions } = librarySlice

export const store = configureStore({ reducer })

export const useBookmarksStore = () => {
  const library = useSelector((state: IState) => state)
  const dispatch = useDispatch()
  return [library, dispatch] as [typeof library, typeof dispatch]
}
