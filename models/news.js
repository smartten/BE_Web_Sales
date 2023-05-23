const News = require('../Entities/news.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage
const fs = require('fs');
const path = require('path');


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
        image: `${process.env.BASE_URL}${dataFile.path}`
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
            const folderPath = './images';
            const fileName = news.image.split('/').at(-1);
            const filePath = path.join(folderPath, fileName);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully.');
                }
            });
            news.set({
                ...(dataFields || {}),
                image: `${process.env.BASE_URL}${dataFile.path}`
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
        const folderPath = './images';
        const fileName = news.image.split('/').at(-1);
        const filePath = path.join(folderPath, fileName);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully.');
            }
        });
        await News.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllNews, createNews, updateNews, deleteNews }