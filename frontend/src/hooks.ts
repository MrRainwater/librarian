import { getMetadata } from 'api'
import { IBookmark } from 'interfaces'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type Setter<T> = Dispatch<SetStateAction<T>>

export function createGlobalStore<T>(defaultValue: T) {
  let data = defaultValue
  let setters: Array<Setter<T>> = []

  function setAll(value: T) {
    data = value
    setters.forEach((setData) => setData(value))
  }

  function hook(): [T, typeof setAll] {
    const [value, set] = useState(data)

    if (!setters.find((setter) => setter === set)) {
      setters.push(set)
    }

    useEffect(() => () => {
      setters = setters.filter((setter) => setter !== set)
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
    return getMetadata(url).then((data) => {
      setMetadata(data)
      return data
    })
  }

  return [metadata, get] as [typeof metadata, typeof get]
}
