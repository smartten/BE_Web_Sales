const mongoose = require('mongoose')
const Schema = mongoose.Schema

var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const order = new Schema({
    buyerName: {
        type: String, required: true
    },
    email: {
        type: String,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String, required: true
    },
    productCode: {
        type: String, required: true
    },
    productName: {
        type: String, required: true
    },
    quantity: {
        type: String, required: true
    },
    totalMoney: {
        type: String, required: true
    },
    status: {
        type: String,
        default : 'bought'
    },
    buyNow: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', order)

module.exports = Order