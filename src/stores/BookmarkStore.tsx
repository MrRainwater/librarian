import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as api from 'api'
import initBrowser from 'browser'
import { IBookmark, IFolder } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkAction } from 'redux-thunk'

export type IFolderMap = Record<string, IFolder>

export interface IState {
  folders: IFolderMap
  currentFolderId: string
  rootFolderId: string
}

type IInitialize = PayloadAction<{
  folders: IFolder[]
  currentFolderId: string
}>

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

type IActions = IInitialize | ISetFolderAction | ISetOpenFolder

export const initialState: IState = {
  folders: {},
  currentFolderId: '',
  rootFolderId: ''
}

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {
    initialize(state, action: IInitialize) {
      const { folders, currentFolderId } = action.payload
      state.currentFolderId = currentFolderId
      state.rootFolderId = currentFolderId
      folders.forEach((f) => (state.folders[f.id] = f))
    },
    setOpenFolder(state, action: ISetOpenFolder) {
      const folder = state.folders[action.payload.folderId]
      state.currentFolderId = folder ? folder.id : state.currentFolderId
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setFolder(state, action: ISetFolderAction) {
      // const folder = state.folders[action.payload.folderId] as IFolderFull
      // folder.bookmarks = action.payload.bookmarks
    }
  }
})

export const { reducer } = librarySlice

type Thunk = ThunkAction<void, IState, null, IActions>

const loadBookmarks = (): Thunk => async (dispatch) => {
  await initBrowser()
  const rootNodes = await browser.bookmarks.getTree()
  const getFolders = (
    nodes: browser.bookmarks.IBookmarkTreeNode[]
  ): IFolder[] => {
    const currentFolders = nodes.filter(
      (node): node is IFolder => node.type === 'folder'
    )

    const subFolders = currentFolders.flatMap((folder) =>
      getFolders(folder.children)
    )

    return [...currentFolders, ...subFolders]
  }

  const folders = getFolders(rootNodes)

  const rootFolder: IFolder = {
    id: '',
    children: folders,
    parentId: '',
    type: 'folder',
    title: ''
  }

  let currentFolderId: string
  if (rootNodes.length === 1) {
    currentFolderId = rootNodes[0].id
  } else {
    currentFolderId = rootFolder.id
    folders.push(rootFolder)
  }

  dispatch(librarySlice.actions.initialize({ folders, currentFolderId }))
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
      librarySlice.actions.setFolder({
        folderId: folder.id,
        bookmarks
      })
    )
  }
  dispatch(librarySlice.actions.setOpenFolder({ folderId: folder.id }))
}

export const actions = {
  ...librarySlice.actions,
  loadBookmarks,
  openBookmark
}

export const store = configureStore({ reducer })

export const useBookmarksStore = () => {
  const library = useSelector((state: IState) => state)
  const dispatch = useDispatch()
  return [library, dispatch] as const
}
