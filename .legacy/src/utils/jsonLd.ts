import { ItemType } from '@/interfaces'

export const genBreadcrumb = (
  level: number,
  type: ItemType = 'photo',
  locationName: string = ''
) => {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'pov.tw',
        item: `${location.origin}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: type === 'photo' ? '照片列表' : '影片列表',
        item: `${location.origin}/#/${type[0]}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: locationName,
      },
    ].slice(0, level),
  })
}
