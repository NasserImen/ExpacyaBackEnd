// connect to database
const express = require('express')
// import database
const db = require('./database/connect')
const initScript = require ('./database/initScript')
var morgan = require('morgan')

const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());
const uploadAPI = require('./routes/uploadFile')


app.use(morgan('dev'))
app.use('/upload', uploadAPI)





// parse application/x-www-form-urlencoded


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })