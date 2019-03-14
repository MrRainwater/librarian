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
    const json = await res.json()

    return json.data
  } catch (err) {
    console.error('Error in graphql call')
    console.error(query)
    console.error({ variables })
    throw new Error('Network Error')
  }
}

export function getBookmarks(): Promise<IBookmark> {
  return graphql(`
    {
      bookmarks {
        url
        title
        description
        img
      }
    }
  `)
}
