const contentful = require('contentful')
const fs = require('fs')
const path = require('path')

const { SPACE_ID = '', ACCESS_TOKEN = '' } = process.env
const FILE_NAME = 'contentfulEntries.json'

const exec = (space, accessToken) => {
  if (!space || !accessToken) {
    console.error(
      'Please provide process.env.SPACE_ID and process.env.ACCESS_TOKEN'
    )
    return
  }

  const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
  })

  client
    .getEntries()
    .then((res) => {
      fs.writeFileSync(path.resolve(__dirname, FILE_NAME), JSON.stringify(res))
      console.log(`Contentful data updated in ${FILE_NAME}`)
    })
    .catch((err) => {
      console.error(err)
    })
}

exec(SPACE_ID, ACCESS_TOKEN)
