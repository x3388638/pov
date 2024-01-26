const fs = require('fs')
const path = require('path')

const baseUrl = 'https://pov.tw'

const exec = () => {
  let data = {}
  const urlList = [baseUrl, `${baseUrl}/p`, `${baseUrl}/v`]
  data = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, 'app', '_assets', 'contentfulEntries.json'),
      'utf-8'
    )
  )
  ;(data.items || []).forEach((entry) => {
    if (entry?.sys?.contentType?.sys?.id === 'location') {
      const id = entry?.sys?.id
      id != null && urlList.push(`${baseUrl}/p/${id}`)
    }
  })

  fs.writeFileSync(
    path.resolve(__dirname, 'public', 'sitemap.txt'),
    urlList.join('\n')
  )
  console.log(`Sitemap updated; URL count: ${urlList.length}`)
}

try {
  exec()
} catch (err) {
  console.error(err)
}
