require('dotenv').config();
// const modelUser = require('../models/user');
const modelCandidate = require('../models/candidate')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllCandidate(req, res) {
    try {
        let candidate = await modelCandidate.getAllCandidate(req.query)
        res.json(candidate)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in candidate ", JSON.stringify(err)]))
    }
}


async function createCandidate(req, res) {
    try {
        let candidate = await modelCandidate.createCandidate(req.body)
        res.json({ candidate })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in candidate", err]))
    }
}

async function updateCandidate(req, res) {
    try {
        let candidate = await modelCandidate.updateCandidate(req.body)
        res.json({ candidate })
    }
    catch (err) {
        console.log("err" ,err);
        
        res.status(402).json(errorMessage(["err in candidate", err]))
    }
}

async function deleteCandidate(req, res) {
    try {
        let response = await modelCandidate.deleteCandidate(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in candidate", err]))
    }
}

module.exports = { getAllCandidate ,createCandidate ,updateCandidate ,deleteCandidate }