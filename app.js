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

const POST = process.env.POST || 5001
app.listen(POST, () => console.log("run with mongoo on post " + POST))