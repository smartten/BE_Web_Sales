require('dotenv').config();
// const modelUser = require('../models/user');
const modelOrder = require('../models/order')
const jwt = require('jsonwebtoken');
const errorMessage = require('../config').errorMessage


async function getAllOrder(req, res) {
    try {
        let order = await modelOrder.getAllOrder(req.query)
        res.json(order)
    }
    catch (err) {
        console.log(err)
        res.status(402).json(errorMessage(["err in Order ", JSON.stringify(err)]))
    }
}

async function createOrder(req, res) {
    try {
        let order = await modelOrder.createOrder(req.body)
        res.json({ order })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in Order", err]))
    }
}

async function updateOrder(req, res) {
    try {
        let order = await modelOrder.updateOrder(req.body)
        res.json({ order })
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in Order", err]))
    }
}

async function deleteOrder(req, res) {
    try {
        let response = await modelOrder.deleteOrder(req.params)
        res.json(response)
    }
    catch (err) {
        res.status(402).json(errorMessage(["err in Order", err]))
    }
}

module.exports = { getAllOrder ,createOrder ,deleteOrder ,updateOrder }