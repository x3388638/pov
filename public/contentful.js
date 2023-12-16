const fs = require('fs')
const path = require('path')

const { SPACE_ID = '', ACCESS_TOKEN = '' } = process.env
const FILE_NAME = 'contentfulEntries.json'
const LIMIT = 800

const entries = { items: [], includes: { Asset: [] } }

const getEntries = (limit = LIMIT, skip = 0) =>
  fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&limit=${limit}&skip=${skip}`
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(`Data fetched - limit: ${limit}; skip: ${skip} `)
      entries.items.push(...(res?.items || []))
      entries.includes.Asset.push(...(res?.includes?.Asset || []))

      if (res?.total > limit + skip) {
        return getEntries(limit, skip + limit)
      }
    })

const exec = () => {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    console.error(
      'Please provide process.env.SPACE_ID and process.env.ACCESS_TOKEN'
    )
    return
  }

  getEntries()
    .then(() => {
      fs.writeFileSync(
        path.resolve(__dirname, FILE_NAME),
        JSON.stringify(entries)
      )
      console.log(`Contentful data updated in ${FILE_NAME}`)
      console.log(`Total entry count: ${entries.items.length}`)
    })
    .catch((err) => {
      console.error(err)
    })
}

exec()
