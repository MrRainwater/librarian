import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBookmark, IFolder, IFolderFull } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'

export interface IFolderMap {
  '': IFolderFull
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
}

export const initialState: IState = {
  folders: {
    '': {
      id: '',
      name: '',
      bookmarks: [],
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
      const globalFolder = state.folders['']
      globalFolder.bookmarks = bookmarks
      folders.forEach((f) => (state.folders[f.id] = f))
    },
    openFolder(state, action: PayloadAction<IOpenFolder>) {
      const folder = state.folders[action.payload.folderId]
      state.currentFolderId = folder ? folder.id : state.currentFolderId
    },
    setFolder(state, action: PayloadAction<ISetFolder>) {
      const folder = state.folders[action.payload.folderId] as IFolderFull
      state.currentFolderId = folder?.id ?? state.currentFolderId
      folder.bookmarks = action.payload.bookmarks
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
