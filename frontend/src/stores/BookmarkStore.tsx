import {
  Action,
  configureStore,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import * as api from 'api'
import { IBookmark, IFolder } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkAction } from 'redux-thunk'

export type IFolderMap = Record<string, IFolder>

export interface IState {
  folders: IFolderMap
  currentFolderId: string
}

interface IInitialize {
  folders: IFolder[]
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
  folders: {},
  currentFolderId: ''
}

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    initialize(state, action: PayloadAction<IInitialize>) {
      const { folders } = action.payload
      folders.forEach((f) => (state.folders[f.id] = f))
    },
    setOpenFolder(state, action: ISetOpenFolder) {
      const folder = state.folders[action.payload.folderId]
      state.currentFolderId = folder ? folder.id : state.currentFolderId
    },
    setFolder(state, action: ISetFolderAction) {
      // const folder = state.folders[action.payload.folderId] as IFolderFull
      // folder.bookmarks = action.payload.bookmarks
    }
  }
})

export const { reducer } = librarySlice

type Thunk = ThunkAction<void, IState, null, IActions>

const initialize = (): Thunk => async (dispatch) => {
  const [rootNode] = await browser.bookmarks.getTree()
  const nodes = rootNode.children!

  const folders = nodes.filter(
    (node): node is IFolder => node.type === 'folder'
  )

  actions.initialize({ bookmarks: [], folders: [] })
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

export const actions = {
  ...librarySlice.actions,
  openBookmark
}

export const store = configureStore({ reducer })

export const useBookmarksStore = () => {
  const library = useSelector((state: IState) => state)
  const dispatch = useDispatch()
  return [library, dispatch] as [typeof library, typeof dispatch]
}
