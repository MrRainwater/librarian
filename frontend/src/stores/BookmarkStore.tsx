import { IBookmark } from 'interfaces'
import * as React from 'react'

const { createContext, useReducer, useContext } = React

type State = typeof initialState

interface AddBookmark {
  type: 'ADD_BOOKMARK'
  bookmark: IBookmark
}

interface TagBookmark {
  type: 'TAG_BOOKMARK_BY_TITLE'
  tag: string
  title: string
}

type Action = AddBookmark | TagBookmark

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
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.bookmark]
      }
    case 'TAG_BOOKMARK_BY_TITLE':
      const bookmark = state.bookmarks.find(b => b.title === action.title)
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
    default:
      logError(action)
      return state
  }
}

export const BookmarksContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
])

export const BookmarksStoreProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => (
  <BookmarksContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </BookmarksContext.Provider>
)

export const useBookmarksStore = () => useContext(BookmarksContext)

export const withBookmarksStore = (Component: React.FC) => (
  <BookmarksStoreProvider>
    <Component />
  </BookmarksStoreProvider>
)
