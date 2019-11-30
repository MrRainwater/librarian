import { Map } from 'immutable'
import { IBookmark, IFolder } from 'interfaces'
import * as React from 'react'

const { createContext, useReducer, useContext } = React

interface IState {
  folders: Map<string, IFolder>
}

interface IInitialize {
  type: 'INITIALIZE'
  folders: IFolder[]
  bookmarks: IBookmark[]
}

type IAction = IInitialize

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
  })
}

export const reducer: Reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      const bookmarks = action.bookmarks
      const folders = Map(action.folders.map((folder) => [folder.id, folder]))
      return {
        ...state,
        folders: folders.set('', {
          id: '',
          name: '',
          subFolderIds: [],
          bookmarks
        })
      }
    default:
      // logError(action)
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
