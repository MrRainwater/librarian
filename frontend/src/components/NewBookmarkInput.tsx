import { useGetMetadata } from 'hooks'
import { IBookmark } from 'interfaces'
import * as React from 'react'
import Input from 'react-toolbox/lib/input'

const { useState, useEffect } = React

interface IProps {
  onNewBookmark: (bookmark: IBookmark) => void
}

const NewBookarkInput: React.FunctionComponent<IProps> = ({
  onNewBookmark
}) => {
  const [url, setUrl] = useState('')
  const [metadata, getMetadata] = useGetMetadata()

  useEffect(() => {
    if (metadata) {
      onNewBookmark(metadata)
      setUrl('')
    }
  }, [metadata])

  return (
    <Input
      hint="New Bookmark"
      label="url"
      value={url}
      onChange={(value: string) => setUrl(value)}
      onKeyPress={(e: any) => e.key === 'Enter' && getMetadata(url)}
    />
  )
}

export default NewBookarkInput
