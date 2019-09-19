const fs = require('fs')
const axios = require('axios')

const query = `query {
  articles (where: { status: "published" }) {
    _id
    splash
  }
}`

axios
  .create({
    baseURL:
      process.env.VUE_APP_API_BASE_URL || 'https://research.icjia-api.cloud'
  })
  .post('/graphql', { query, validateStatus: status => status === 200 })
  .then(res => writeImages(res.data.data.articles, ['splash']))
  .catch(err => console.error(err))

const writeImages = (items, attrs) =>
  items.forEach(item => attrs.forEach(attr => writeImage(item, attr)))

const writeImage = (item, attr) => {
  const dirpath = './public/images'
  const base64 = item[attr]
  const data = base64.split(';base64,').pop()
  const ext = base64.split('data:image/')[1].split(';')[0]
  const path = `${dirpath}/${item._id}-${attr}.${ext}`

  if (!fs.existsSync(dirpath)) fs.mkdirSync(dirpath)

  fs.writeFile(path, data, 'base64', err => {
    if (err) throw err
  })
}
