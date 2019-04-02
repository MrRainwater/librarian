import { IBookmark } from 'interfaces'

async function graphql(query: string, variables?: any) {
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

    if (errors) throw errors

    return data
  } catch (err) {
    console.error('Error in graphql call')
    console.error(query)
    console.error({ variables })
    if (Array.isArray(err)) {
      err.map(e => new Error(e.message)).forEach(e => console.error(e))
    }
    throw new Error('Network Error')
  }
}

export function getBookmarks(): Promise<IBookmark[]> {
  return graphql(`
    query getBookmarks {
      bookmarks {
        url
        title
        description
        img
      }
    }
  `).then(data => data.bookmarks)
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
  ).then(data => data.createBookmark)
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
  ).then(data => data.metadata)
}
