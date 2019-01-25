const express = require('express')
const axios = require('axios')
const app = express()
const router = express.Router()
const port = process.env.PUBSUB_PORT || 5000

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/coords', (req, res) => {
  axios.get(`https://www.metaweather.com/api/location/search/?lattlong=${req.query.lat},${req.query.long}`)
    .then(response => {
      axios.get(`https://www.metaweather.com/api/location/${response.data[0].woeid.toString()}`)
        .then(response => {
          res.send(response.data)
        })
        .catch(e => {
          res.statusCode = 400
          res.send()
        })
    })
    .catch(e => {
      res.statusCode = 400
      res.send()
    })
})


router.get('/city', (req, res) => {
  axios.get(`https://www.metaweather.com/api/location/search/?query=${req.query.q}`)
    .then(response => {
      axios.get(`https://www.metaweather.com/api/location/${response.data[0].woeid.toString()}`)
        .then(response => {
          res.send(response.data)
        })
        .catch(e => {
          res.statusCode = 400
          res.send()
        })
    })
    .catch(e => {
      res.statusCode = 400
      res.send()
    })
})

app.use(router)

app.listen(port)
