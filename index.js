// connect to database
const express = require('express')
// import database
const db = require('./database/connect')

const bodyParser = require('body-parser')
const app = express()
const port = 3000

const uploadAPI = require('./routes/uploadFile')

app.use('/upload', uploadAPI)




// parse application/x-www-form-urlencoded


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })