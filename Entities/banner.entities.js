const mongoose = require('mongoose')
const Schema = mongoose.Schema

const banner = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true
    },
    location: {
        type: String, required: true
    },
    image: {
        type: String, required: true
    },
    link: {
        type: String, required: true
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

const Banner = mongoose.model('Banner', banner)

module.exports = Banner