import {
  Action,
  configureStore,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import * as api from 'api'
import { IBookmark, IFolder, IFolderFull } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkAction } from 'redux-thunk'

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

type ISetFolderAction = PayloadAction<{
  folderId: string
  bookmarks: IBookmark[]
}>

interface IMoveBookmark {
  bookmarkId: string
  targetFolderId: string
}

type IActions = ISetFolderAction

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
    setFolder(state, action: ISetFolderAction) {
      const folder = state.folders[action.payload.folderId] as IFolderFull
      // TODO: probably doesn't need to set currentFolder but is accidentally preventing
      state.currentFolderId = folder?.id ?? state.currentFolderId
      folder.bookmarks = action.payload.bookmarks
    }
  }
})

export const { reducer } = librarySlice

const moveBookmark = ({
  bookmarkId,
  targetFolderId
}: IMoveBookmark): ThunkAction<void, IState, null, IActions> => async (
  dispatch,
  getState
) => {
  const targetBookmarks = await api.moveBookmark(bookmarkId, targetFolderId)
  const { currentFolderId, folders } = getState()
  const { bookmarks: currentBookmarks } = folders[
    currentFolderId
  ] as IFolderFull
  dispatch(
    actions.setFolder({
      bookmarks: targetBookmarks,
      folderId: targetFolderId
    })
  )
  dispatch(
    actions.setFolder({
      folderId: currentFolderId,
      bookmarks: currentBookmarks.filter(({ id }) => id !== bookmarkId)
    })
  )
}

export const actions = {
  ...librarySlice.actions,
  moveBookmark
}

export const store = configureStore({ reducer })

export const useBookmarksStore = () => {
  const library = useSelector((state: IState) => state)
  const dispatch = useDispatch()
  return [library, dispatch] as [typeof library, typeof dispatch]
}
