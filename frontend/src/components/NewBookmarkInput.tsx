import TextField from '@material-ui/core/TextField'
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
    <TextField
      label="url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && getMetadata(url)}
    />
  )
}

export default NewBookarkInput
