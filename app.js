require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(bodyParser.json());

const {connect} = require('./models/connect')
connect()

app.use(express.static('images'));
app.use('/images', express.static('images'));

const router = require('./router')
app.use('/', router);

const POST = process.env.POST || 5001
app.listen(POST, () => console.log("run with mongoo on post " + POST))