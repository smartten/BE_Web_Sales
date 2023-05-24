require('dotenv').config();
// const modelUser = require('../models/user');
const modelRecruit = require('../models/recruit')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllRecruit(req, res) {
    try {
        let recruit = await modelRecruit.getAllRecruit(req.query)
        res.json(recruit)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in recruit ", JSON.stringify(err)]))
    }
}


async function createRecruit(req, res) {
    try {
        let recruit = await modelRecruit.createRecruit(req.body)
        res.json({ recruit })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in recruit", err]))
    }
}

async function updateRecruit(req, res) {
    try {
        let recruit = await modelRecruit.updateRecruit(req.body)
        res.json({ recruit })
    }
    catch (err) {
        console.log("err" ,err);
        
        res.status(402).json(errorMessage(["err in recruit", err]))
    }
}

async function deleteRecruit(req, res) {
    try {
        let response = await modelRecruit.deleteRecruit(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in recruit", err]))
    }
}

module.exports = { getAllRecruit ,createRecruit ,updateRecruit ,deleteRecruit }