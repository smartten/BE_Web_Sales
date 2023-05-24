require('dotenv').config();
const cloudinary = require('cloudinary').v2;
// const modelUser = require('../models/user');
const modelBanner = require('../models/banner')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllBanner(req, res) {
    try {
        let banner = await modelBanner.getAllBanner(req.query)
        res.json(banner)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in banner ", JSON.stringify(err)]))
    }
}

async function createBanner(req, res) {
    try {
        let banner = await modelBanner.createBanner(req)
        res.json({ banner })
    }
    catch (err) {
        if(req.file){
            cloudinary.uploader.destroy(req.file.filename)
        }
        res.status(402).json(errorMessage(["err in banner", err]))
    }
}

async function updateBanner(req, res) {
    try {
        let banner = await modelBanner.updateBanner(req)
        res.json({ banner })
    }
    catch (err) {
        if(req.file){
            cloudinary.uploader.destroy(req.file.filename)
        }
        res.status(402).json(errorMessage(["err in banner", err]))
    }
}

async function deleteBanner(req, res) {
    try {
        let response = await modelBanner.deleteBanner(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in banner", err]))
    }
}

module.exports = { getAllBanner, createBanner, deleteBanner, updateBanner }