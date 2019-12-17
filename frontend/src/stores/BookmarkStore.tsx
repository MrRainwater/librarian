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

type ISetOpenFolder = PayloadAction<{
  folderId: string
}>

type ISetFolderAction = PayloadAction<{
  folderId: string
  bookmarks: IBookmark[]
}>

interface IMoveBookmark {
  bookmarkId: string
  targetFolderId: string
}

interface IUnfolderBookmark {
  bookmarkId: string
}

type IActions = ISetFolderAction | ISetOpenFolder

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
    setOpenFolder(state, action: ISetOpenFolder) {
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

type Thunk = ThunkAction<void, IState, null, IActions>

const moveBookmark = ({
  bookmarkId,
  targetFolderId
}: IMoveBookmark): Thunk => async (dispatch, getState) => {
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

const openBookmark = ({ folderId }: { folderId: string }): Thunk => async (
  dispatch,
  getState
) => {
  const { folders } = getState()
  const folder = folders[folderId]
  if (!('bookmarks' in folder)) {
    const bookmarks = await api.openFolder(folder.id)
    dispatch(
      actions.setFolder({
        folderId: folder.id,
        bookmarks
      })
    )
  }
  dispatch(actions.setOpenFolder({ folderId: folder.id }))
}

const unfolderBookmark = ({ bookmarkId }: IUnfolderBookmark): Thunk => async (
  dispatch,
  getState
) => {
  const bookmark = await api.unfolderBookmark(bookmarkId)
  const { currentFolderId, folders } = getState()
  const { bookmarks: currentBookmarks } = folders[
    currentFolderId
  ] as IFolderFull
  const { bookmarks: targetBookmarks } = folders['']
  dispatch(
    actions.setFolder({
      bookmarks: [...targetBookmarks, bookmark],
      folderId: ''
    })
  )
  dispatch(
    actions.setFolder({
      bookmarks: currentBookmarks.filter(({ id }) => id !== bookmarkId),
      folderId: currentFolderId
    })
  )
}

export const actions = {
  ...librarySlice.actions,
  moveBookmark,
  openBookmark,
  unfolderBookmark
}

export const store = configureStore({ reducer })

export const useBookmarksStore = () => {
  const library = useSelector((state: IState) => state)
  const dispatch = useDispatch()
  return [library, dispatch] as [typeof library, typeof dispatch]
}
