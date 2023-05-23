require('dotenv').config();
// const modelUser = require('../models/user');
const modelProduct = require('../models/product')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllProduct(req, res) {
    try {
        let product = await modelProduct.getAllProduct(req.query)
        res.json(product)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in product ", JSON.stringify(err)]))
    }
}

async function createProduct(req, res) {
    try {
        console.log("aaa");
        
        let product = await modelProduct.createProduct(req)
        res.json({ product })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in product", err]))
    }
}

async function updateProduct(req, res) {
    try {
        let product = await modelProduct.updateProduct(req)
        res.json({ product })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in product", err]))
    }
}

async function deleteProduct(req, res) {
    try {
        let response = await modelProduct.deleteProduct(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in product", err]))
    }
}

module.exports = { getAllProduct, createProduct, deleteProduct, updateProduct }