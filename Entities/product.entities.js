const mongoose = require('mongoose')
const Schema = mongoose.Schema

const product = new Schema({
    name: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    mainImage: {
        type: String, required: true
    },
    subImages: {
        type: [String]
    },
    quantity : {
        type : String , required : true
    },
    price : {
        type : String , required : true
    },
    hide : {
        type : Boolean,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', product)

module.exports = Product