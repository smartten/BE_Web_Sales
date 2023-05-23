const Order = require('../Entities/order.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage

async function getAllOrder(query) {
    const { q, type } = query
    if (type == 'buyNow') {
        const { startDate, endDate, date } = query
        if (date) {
            const order = await Order.find({
                buyNow: date
            });
            return order
        }
        else {
            const order = await Order.find({
                buyNow: {
                    $gte: startDate,
                    $lte: endDate
                }
            });
            return order
        }
    }
    if (q && type) {
        const order = await Order.find({
            [type]: { $regex: new RegExp(q, "i") }
        });
        return order
    }
    return Order.find()
}

async function createOrder(payload) {
    const newOrder = new Order(payload)
    const create = await newOrder.save();
    return create;
}

async function updateOrder(payload) {
    try {
        const newOrder = await Order.findOne({ _id: payload._id });
        if (!newOrder) throw new Error('user not found')
        const { _id, ...data } = payload
        newOrder.set(data)
        const update = await newOrder.save();
        return update;
    } catch (err) {
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteOrder({ id }) {
    try {
        await Order.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllOrder, createOrder, updateOrder, deleteOrder }