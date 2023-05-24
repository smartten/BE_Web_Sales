require('dotenv').config();
const cloudinary = require('cloudinary').v2;
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
        let product = await modelProduct.createProduct(req)
        res.json({ product })
    }
    catch (err) {
        if (req.files) {
            if (req.files?.mainImage) {
                cloudinary.uploader.destroy(req.files?.mainImage[0]?.filename)
            }
            if (req.files?.subImages) {
                for (let i = 0; i < req.files?.subImages.length; i++) {
                    cloudinary.uploader.destroy(req.files?.subImages[i]?.filename)
                }
            }
        }
        res.status(402).json(errorMessage(["err in product", err]))
    }
}

async function updateProduct(req, res) {
    try {
        let product = await modelProduct.updateProduct(req)
        res.json({ product })
    }
    catch (err) {
        if (req.files) {
            if (req.files?.mainImage) {
                cloudinary.uploader.destroy(req.files?.mainImage[0]?.filename)
            }
            if (req.files?.subImages) {
                for (let i = 0; i < req.files?.subImages.length; i++) {
                    cloudinary.uploader.destroy(req.files?.subImages[i]?.filename)
                }
            }
        }
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