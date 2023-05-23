require('dotenv').config();
// const modelUser = require('../models/user');
const modelNews = require('../models/news')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllNews(req, res) {
    try {
        let news = await modelNews.getAllNews(req.query)
        res.json(news)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in news ", JSON.stringify(err)]))
    }
}

async function createNews(req, res) {
    try {
        let news = await modelNews.createNews(req)
        res.json({ news })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in news", err]))
    }
}

async function updateNews(req, res) {
    try {
        let news = await modelNews.updateNews(req)
        res.json({ news })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in news", err]))
    }
}

async function deleteNews(req, res) {
    try {
        let response = await modelNews.deleteNews(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in News", err]))
    }
}

module.exports = { getAllNews, createNews, deleteNews, updateNews }