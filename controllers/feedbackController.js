require('dotenv').config();
// const modelUser = require('../models/user');
const modelFeedBack = require('../models/feedback')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllFeedBack(req, res) {
    try {
        let feedBack = await modelFeedBack.getAllFeedBack(req.query)
        res.json(feedBack)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in feedBack ", JSON.stringify(err)]))
    }
}


async function createFeedBack(req, res) {
    try {
        let feedBack = await modelFeedBack.createFeedBack(req.body)
        res.json({ feedBack })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in feedBack", err]))
    }
}

async function updateFeedBack(req, res) {
    try {
        let feedBack = await modelFeedBack.updateFeedBack(req.body)
        res.json({ feedBack })
    }
    catch (err) {
        console.log("err" ,err);
        
        res.status(402).json(errorMessage(["err in feedBack", err]))
    }
}

async function deleteFeedBack(req, res) {
    try {
        let response = await modelFeedBack.deleteFeedBack(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in feedBack", err]))
    }
}

module.exports = { getAllFeedBack ,createFeedBack ,updateFeedBack ,deleteFeedBack }