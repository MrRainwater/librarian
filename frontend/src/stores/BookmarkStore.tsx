import { Map } from 'immutable'
import { IBookmark, IFolder } from 'interfaces'
import * as React from 'react'

const { createContext, useReducer, useContext } = React

interface IState {
  folders: Map<string, IFolder>
  currentFolderId: string
}

interface IInitialize {
  type: 'INITIALIZE'
  folders: IFolder[]
  bookmarks: IBookmark[]
}

interface IOpenFolder {
  type: 'OPEN_FOLDER'
  folderId: string
}

interface ISetFolder {
  type: 'SET_FOLDER'
  folderId: string
  bookmarks: IBookmark[]
}

type IAction = IInitialize | IOpenFolder | ISetFolder

type Reducer = (state: IState, action: IAction) => IState

function logError(action: never) {
  console.error({
    message: 'Invalid action',
    action
  })
}

export const initialState: IState = {
  folders: Map({
    '': {
      id: '',
      name: '',
      bookmarks: [],
      subFolderIds: [],
      parentFolderId: ''
    }
  }),
  currentFolderId: ''
}

export const reducer: Reducer = (state, action) => {
  let bookmarks: IBookmark[]
  let folders: Map<string, IFolder>
  let folder: IFolder
  let currentFolderId: string

  switch (action.type) {
    case 'INITIALIZE':
      bookmarks = action.bookmarks
      const globalFolder = state.folders.get('')!
      folders = Map(action.folders.map((f) => [f.id, f]))
      return {
        ...state,
        folders: folders.set('', {
          ...globalFolder,
          bookmarks
        })
      }
    case 'OPEN_FOLDER':
      folder = state.folders.get(action.folderId)!
      currentFolderId = folder ? folder.id : state.currentFolderId
      return { ...state, currentFolderId }
    case 'SET_FOLDER':
      folder = state.folders.get(action.folderId)!
      currentFolderId = folder ? folder.id : state.currentFolderId
      bookmarks = folder.bookmarks ? folder.bookmarks : action.bookmarks
      return {
        ...state,
        currentFolderId,
        folders: state.folders.set(folder.id, { ...folder, bookmarks })
      }
    default:
      logError(action)
      return state
  }
}

export const BookmarksContext = createContext<
  [typeof initialState, React.Dispatch<IAction>]
>([initialState, () => initialState])

export const BookmarksStoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => (
  <BookmarksContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </BookmarksContext.Provider>
)

export const useBookmarksStore = () => useContext(BookmarksContext)

export const withBookmarksStore = (component: React.ReactElement) => (
  <BookmarksStoreProvider>{component}</BookmarksStoreProvider>
)
