import { IBookmark, IFolder } from 'interfaces'
import * as React from 'react'

const { createContext, useReducer, useContext } = React

interface IState {
  folders: IFolder[]
  bookmarks: IBookmark[]
}

interface IAddBookmark {
  type: 'ADD_BOOKMARK'
  bookmark: IBookmark
}

interface ITagBookmark {
  type: 'TAG_BOOKMARK_BY_TITLE'
  tag: string
  title: string
}

interface ISetBookmarks {
  type: 'SET_BOOKMARKS'
  bookmarks: IBookmark[]
}

type IAction = IAddBookmark | ITagBookmark | ISetBookmarks

type Reducer = (state: IState, action: IAction) => IState

function logError(action: never) {
  console.error({
    message: 'Invalid action',
    action
  })
}

export const initialState: IState = {
  folders: [],
  bookmarks: []
}

export const reducer: Reducer = (state, action) => {
  const bookmark = state.bookmarks.find(
    (b) => b.title === (action as any).title
  )
  switch (action.type) {
    case 'SET_BOOKMARKS':
      return {
        ...state,
        bookmarks: action.bookmarks
      }
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.bookmark]
      }
    case 'TAG_BOOKMARK_BY_TITLE':
      if (bookmark) {
        return {
          ...state,
          bookmarks: [
            ...state.bookmarks.filter((b) => b.title !== action.title),
            {
              ...bookmark,
              tags: [...bookmark.tags, action.tag]
            }
          ]
        }
      } else {
        return state
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

export const useBookmarkActions = (bookmark: IBookmark) => {
  const [, dispatch] = useBookmarksStore()
  const title = bookmark.title

  return {
    tag(tag: string) {
      dispatch({ type: 'TAG_BOOKMARK_BY_TITLE', title, tag })
    }
  }
}

export const withBookmarksStore = (component: React.ReactElement) => (
  <BookmarksStoreProvider>{component}</BookmarksStoreProvider>
)
