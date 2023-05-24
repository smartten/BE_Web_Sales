const Banner = require('../Entities/banner.entities');
const cloudinary = require('cloudinary').v2;
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage
const fs = require('fs');
const {deleteImageFromCloud} = require('../hepper/deleteImageFromCloud')


async function getAllBanner(query) {
    const q = query.q
    if (q) {
        const banner = await Banner.find({
            title: { $regex: new RegExp(q, "i") }
        });
        return banner
    }
    return Banner.find()
}

async function createBanner(req) {
    const dataFile = req.file
    const dataFields = req.body
    const newBanner = new Banner({
        ...dataFields,
        image: dataFile?.path
    })
    const create = await newBanner.save();
    return create;
}

async function updateBanner(req) {
    try {
        const dataFile = req.file
        const dataFields = req.body

        const banner = await Banner.findOne({ _id: dataFields._id });
        if (!banner) throw new Error('banner not found')
        if (dataFile) {
            deleteImageFromCloud(banner)
            banner.set({
                ...dataFields,
                image: dataFile?.path
            })
            const create = await banner.save();
            return create;
        }
        else {
            banner.set(dataFields)
            const create = await banner.save();
            return create;
        }
    } catch (err) {
        console.log("err" ,err);
        
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteBanner({ id }) {
    try {
        const banner = await Banner.findOne({ _id: id });
        deleteImageFromCloud(banner)
        await Banner.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllBanner, createBanner, updateBanner, deleteBanner }