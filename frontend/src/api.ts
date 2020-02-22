import { IBookmark, IFolder } from 'interfaces'

async function graphql<T = any>(query: string, variables?: any): Promise<T> {
  try {
    const res = await fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    })
    const { data, errors } = await res.json()

    if (errors) {
      throw errors
    }

    return data
  } catch (err) {
    console.error('Error in graphql call')
    console.error(query)
    console.error({ variables })
    if (Array.isArray(err)) {
      err.map((e) => new Error(e.message)).forEach((e) => console.error(e))
    }
    throw new Error('Network Error')
  }
}

export function getInitial(): Promise<{
  bookmarks: IBookmark[]
  folders: IFolder[]
}> {
  return graphql(`
    query getInitial {
      folders {
        id
        name
        parentFolder {
          id
        }
      }
      bookmarks {
        id
        url
        title
        description
        img
      }
    }
  `).then(({ bookmarks, folders }) => ({
    bookmarks,
    folders: folders.map((folder: any) => ({
      ...folder,
      parentFolderId: folder.parentFolder?.id ?? ''
    }))
  }))
}

export function openFolder(folderId: string): Promise<IBookmark[]> {
  return graphql(
    `
      query openFolder($folderId: String!) {
        openFolder(folderId: $folderId) {
          bookmarks {
            id
            url
            title
            description
            img
          }
        }
      }
    `,
    { folderId }
  ).then(({ openFolder: { bookmarks } }) => bookmarks)
}

export function createBookmark(input: IBookmark): Promise<IBookmark> {
  return graphql(
    `
      mutation createBookmark($input: BookmarkInput!) {
        createBookmark(input: $input) {
          url
          title
          description
          img
        }
      }
    `,
    { input }
  ).then((data) => data.createBookmark)
}

export function getMetadata(url: string): Promise<IBookmark> {
  return graphql(
    `
      query getMetadata($url: String!) {
        metadata(url: $url) {
          url
          title
          description
          img
        }
      }
    `,
    { url }
  ).then((data) => data.metadata)
}

interface IMoveBookmarkResponse {
  moveBookmark: { bookmarks: IBookmark[] }
}

export function moveBookmark(
  bookmarkId: string,
  folderId: string
): Promise<IBookmark[]> {
  return graphql<IMoveBookmarkResponse>(
    `
      mutation moveBookmark($bookmarkId: String!, $folderId: String!) {
        moveBookmark(bookmarkId: $bookmarkId, folderId: $folderId) {
          bookmarks {
            id
            url
            title
            description
            img
          }
        }
      }
    `,
    { bookmarkId, folderId }
  ).then(({ moveBookmark: { bookmarks } }) => bookmarks)
}

interface IUnfolderBookmarkResponse {
  unfolderBookmark: IBookmark
}

export const unfolderBookmark = (bookmarkId: string) =>
  graphql<IUnfolderBookmarkResponse>(
    `
      mutation unfolderBookmark($bookmarkId: String!) {
        unfolderBookmark(bookmarkId: $bookmarkId) {
          id
          url
          title
          description
          img
        }
      }
    `,
    { bookmarkId }
  ).then(({ unfolderBookmark: bookmark }) => bookmark)
