if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

// IMPORT REQUIRED ROUTERS AND MODELS
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/auther')


// BASIC SERVER SETUP
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// Connection to mongodb
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology:true})
const db = mongoose.connection
db.on('error', error => console.log(errpr))
db.once('open', () => console.log('Connected to mongoose'))



// ROUTERS 
app.use('/' ,indexRouter)
app.use('/authors' ,authorRouter)





app.listen(process.env.PORT || 3000)