require('dotenv').config();
// const modelUser = require('../models/user');
const modelAccount = require('../models/account')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllAccount(req, res) {
    try {
        let account = await modelAccount.getAllAccount(req.query)
        res.json(account)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in GETUSER ", JSON.stringify(err)]))
    }
}

async function createAccount(req, res) {
    try {
        let account = await modelAccount.createAccount(req.body)
        res.json({ account })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in account", err]))
    }
}

async function updateAccount(req, res) {
    try {
        let account = await modelAccount.updateAccount(req.body)
        res.json({ account })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in account", err]))
    }
}

async function deleteAccount(req, res) {
    try {
        let response = await modelAccount.deleteAccount(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in account", err]))
    }
}

module.exports = { getAllAccount ,createAccount ,deleteAccount ,updateAccount }