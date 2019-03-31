import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { IBookmark } from 'interfaces'
import { getMetadata } from 'api'

type Setter<T> = Dispatch<SetStateAction<T>>

export function createGlobalStore<T>(defaultValue: T) {
  let data = defaultValue
  let setters: Setter<T>[] = []

  function setAll(value: T) {
    data = value
    setters.forEach(setData => setData(value))
  }

  function hook(): [T, typeof setAll] {
    const [value, set] = useState(data)

    if (!setters.find(setter => setter === set)) {
      setters.push(set)
    }

    useEffect(() => () => {
      setters = setters.filter(setter => setter !== set)
    })

    return [value, setAll]
  }

  return { data, setAll, hook }
}

const newBookmarkStore = createGlobalStore<IBookmark | undefined>(undefined)

const bookmarksStore = createGlobalStore<IBookmark[]>([])

export const useNewBookmarkStore = newBookmarkStore.hook

export const useBookmarks = bookmarksStore.hook

export function useGetMetadata() {
  const [metadata, setMetadata] = useState<IBookmark | null>(null)

  function get(url: string) {
    return getMetadata(url).then(metadata => {
      console.log('Got metadata', metadata)
      setMetadata(metadata)
      return metadata
    })
  }

  return <[typeof metadata, typeof get]>[metadata, get]
}
