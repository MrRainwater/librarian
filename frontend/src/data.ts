import { IFolderNode } from 'interfaces'

export const folders: IFolderNode[] = [
  {
    id: 'root',
    parentId: '',
    title: '',
    index: 0,
    dateAdded: 1577375345542,
    type: 'folder',
    dateGroupModified: 1582883860416,
    children: [
      {
        id: 'f1',
        parentId: 'root',
        title: 'Folder 1',
        index: 0,
        dateAdded: 1577375345542,
        type: 'folder',
        dateGroupModified: 1582883860416,
        children: [
          {
            id: 'sf1',
            parentId: 'f1',
            title: 'Sub Folder 1',
            index: 0,
            dateAdded: 1577375345542,
            type: 'folder',
            dateGroupModified: 1582883860416,
            children: []
          },
          {
            id: 'bm1',
            title: 'Bookmark 1',
            index: 0,
            dateAdded: 1577375345542,
            type: 'bookmark',
            dateGroupModified: 1582883860416,
            url: 'https://www.google.com/'
          },
          {
            id: 'bm2',
            title: 'Bookmark 2',
            index: 0,
            dateAdded: 1577375345542,
            type: 'bookmark',
            dateGroupModified: 1582883860416,
            url: 'https://www.google.com/'
          }
        ]
      },
      {
        id: 'f2',
        parentId: 'root',
        title: 'Folder 2',
        index: 0,
        dateAdded: 1577375345542,
        type: 'folder',
        dateGroupModified: 1582883860416,
        children: [
          {
            id: 'sf2',
            parentId: 'f2',
            title: 'Sub Folder 2',
            index: 0,
            dateAdded: 1577375345542,
            type: 'folder',
            dateGroupModified: 1582883860416,
            children: []
          }
        ]
      }
    ]
  }
]
