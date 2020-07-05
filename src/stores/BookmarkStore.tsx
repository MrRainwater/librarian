import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import initBrowser from 'browser'
import { IBookmark, IFolder } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkAction } from 'redux-thunk'

export type IFolderMap = Partial<Record<string, IFolder>>

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

type IMoveBookmark = PayloadAction<{
  bookmarkId: string
  targetFolderId: string
}>

type IRemoveNode = PayloadAction<{ id: string }>

interface IUnfolderBookmark {
  bookmarkId: string
}

type IActions =
  | IInitialize
  | ISetFolderAction
  | ISetOpenFolder
  | IMoveBookmark
  | IRemoveNode

export const initialState: IState = {
  folders: {},
  currentFolderId: '',
  rootFolderId: ''
}

const getNodes = (
  nodes: browser.bookmarks.IBookmarkTreeNode[] = []
): browser.bookmarks.IBookmarkTreeNode[] => {
  const children = nodes.flatMap((node) => getNodes(node.children))
  return [...nodes, ...children]
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
    moveBookmark(state, action: IMoveBookmark) {
      const { bookmarkId, targetFolderId } = action.payload

      const nodes = getNodes(Object.values(state.folders) as IFolder[])
      const node = nodes.find(({ id }) => id === bookmarkId)

      if (!node) throw new Error('Attempting to move nonexistant node')

      const targetFolder = state.folders[targetFolderId]
      if (!targetFolder)
        throw new Error('Attempting to move to nonexistant folder')
      const oldFolder = node.parentId ? state.folders[node.parentId] : null

      targetFolder.children.push(node)
      if (oldFolder) {
        oldFolder.children = oldFolder.children.filter(
          (node) => node.id !== bookmarkId
        )
      }
      node.parentId = targetFolderId
      browser.bookmarks.move(bookmarkId, { parentId: targetFolderId })
    },
    removeNode(state, { payload: { id } }: IRemoveNode) {
      const node = getNodes(Object.values(state.folders) as IFolder[]).find(
        (node) => node.id === id
      )

      if (!node) throw new Error('Attemptinf to remove nonexistant node')

      const parentFolder = state.folders[node.parentId || '']

      if (parentFolder) {
        parentFolder.children = parentFolder.children.filter(
          (node) => node.id !== id
        )
      }

      browser.bookmarks.removeTree(id)
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

export const actions = {
  ...librarySlice.actions,
  loadBookmarks
}

export const store = configureStore({ reducer })

export const useBookmarksStore = () => {
  const library = useSelector((state: IState) => state)
  const dispatch = useDispatch()
  return [library, dispatch] as const
}
