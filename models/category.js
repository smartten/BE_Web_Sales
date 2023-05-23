const Category = require('../Entities/category.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage

async function getAllCategory(query) {
    const q = query.q
    if (q) {
        const category = await Category.find({ title: { $regex: new RegExp(q, "i") } });
        return category
    }
    return Category.find()
}

async function createCategory(payload) {
    const newCategory = new Category(payload)
    const create = await newCategory.save();
    return create;
}

async function updateCategory(payload) {
    try {
        const newCategory = await Category.findOne({ _id: payload._id });
        if (!newCategory) throw new Error('user not found')
        const { _id, ...data } = payload
        newCategory.set(data)
        const update = await newCategory.save();
        return update;
    } catch (err) {
        console.log(err, 'asdfasf')
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteCategory({ id }) {
    try {
        await Category.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllCategory, createCategory, updateCategory , deleteCategory }