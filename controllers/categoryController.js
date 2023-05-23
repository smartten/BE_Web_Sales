require('dotenv').config();
// const modelUser = require('../models/user');
const modelCategory = require('../models/category')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllCategory(req, res) {
    try {
        let category = await modelCategory.getAllCategory(req.query)
        res.json(category)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in GETUSER ", JSON.stringify(err)]))
    }
}


async function createCategory(req, res) {
    try {
        let category = await modelCategory.createCategory(req.body)
        res.json({ category })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in category", err]))
    }
}

async function updateCategory(req, res) {
    try {
        let category = await modelCategory.updateCategory(req.body)
        res.json({ category })
    }
    catch (err) {
        console.log("err" ,err);
        
        res.status(402).json(errorMessage(["err in category", err]))
    }
}

async function deleteCategory(req, res) {
    try {
        let response = await modelCategory.deleteCategory(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in category", err]))
    }
}

module.exports = { getAllCategory ,createCategory ,updateCategory ,deleteCategory }