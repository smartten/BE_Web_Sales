const News = require('../Entities/news.entities');
const randtoken = require('rand-token');
const cloudinary = require('cloudinary').v2;
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage
const {deleteImageFromCloud} = require('../hepper/deleteImageFromCloud')



async function getAllNews(query) {
    const q = query.q
    if (q) {
        const news = await News.find({
            title: { $regex: new RegExp(q, "i") }
        });
        return news
    }
    return News.find()
}

async function createNews(req) {
    const dataFile = req.file
    const dataFields = req.body
    const newNews = new News({
        ...dataFields,
        image: dataFile?.path
    })
    const create = await newNews.save();
    return create;
}

async function updateNews(req) {
    try {
        const dataFile = req.file
        const dataFields = req.body
        const news = await News.findOne({ _id: dataFields._id });
        if (!news) throw new Error('News not found')
        if (dataFile) {
            deleteImageFromCloud(news)
            news.set({
                ...(dataFields || {}),
                image: dataFile?.path
            })
            const create = await news.save();
            return create;
        }
        else {
            news.set(dataFields)
            const create = await news.save();
            return create;
        }
    } catch (err) {
        console.log(err);
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteNews({ id }) {
    try {
        const news = await News.findOne({ _id: id });
        deleteImageFromCloud(news)
        await News.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllNews, createNews, updateNews, deleteNews }