import { IBookmark } from 'interfaces'
import * as React from 'react'

const { createContext, useReducer, useContext } = React

type State = typeof initialState

interface AddBookmark {
  type: 'ADD_BOOKMARK'
  bookmark: IBookmark
}

interface AddBookmarkToFolder {
  type: 'ADD_BOOKMARK_TO_FOLDER'
  title: string
  folder: string
}

interface TagBookmark {
  type: 'TAG_BOOKMARK_BY_TITLE'
  tag: string
  title: string
}

interface SetBookmarks {
  type: 'SET_BOOKMARKS'
  bookmarks: IBookmark[]
}

type Action = AddBookmark | TagBookmark | AddBookmarkToFolder | SetBookmarks

type Reducer = (state: State, action: Action) => State

function logError(action: never) {
  console.error({
    message: 'Invalid action',
    action
  })
}

export const initialState = {
  bookmarks: [] as IBookmark[]
}

export const reducer: Reducer = (state, action) => {
  const bookmark = state.bookmarks.find(b => b.title === (action as any).title)
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
            ...state.bookmarks.filter(b => b.title !== action.title),
            {
              ...bookmark,
              tags: [...bookmark.tags, action.tag]
            }
          ]
        }
      } else {
        return state
      }
    case 'ADD_BOOKMARK_TO_FOLDER':
      if (bookmark) {
        return {
          ...state,
          bookmarks: [
            ...state.bookmarks.filter(b => b.title !== action.title),
            {
              ...bookmark,
              folders: [...bookmark.folders, action.folder]
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

export const BookmarksContext = createContext(useReducer(reducer, initialState))

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
    addToFolder(folder: string) {
      dispatch({ type: 'ADD_BOOKMARK_TO_FOLDER', folder, title })
    },
    tag(tag: string) {
      dispatch({ type: 'TAG_BOOKMARK_BY_TITLE', title, tag })
    }
  }
}

export const WithBookmarksStore: React.FC<{ children: React.ReactChild }> = ({
  children
}) => <BookmarksStoreProvider>{children}</BookmarksStoreProvider>
