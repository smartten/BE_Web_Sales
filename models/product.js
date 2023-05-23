const Product = require('../Entities/product.entities');
const randtoken = require('rand-token');
const { generateCodeByTime } = require('../hepper/genarate')
const errorMessage = require('../config').errorMessage
const fs = require('fs');
const path = require('path');


async function getAllProduct(query) {
    const q = query.q
    if (q) {
        const product = await Product.find({
            name: { $regex: new RegExp(q, "i") }
        });
        return product
    }
    return Product.find()
}

async function createProduct(req) {
    const dataFiles = req.files
    const dataFields = req.body
    const mainImage = dataFiles?.mainImage.length > 0 ? dataFiles?.mainImage[0]?.path : ''
    const subImages = dataFiles?.subImages.length > 0 ? dataFiles?.subImages.map(i => `${process.env.BASE_URL}${i?.path}`) : []

    if (!mainImage || subImages.length == 0) {
        return { msg: 'Vui lòng nhập đủ ảnh' }
    }
    else {
        const newProduct = new Product({
            ...dataFields,
            mainImage: `${process.env.BASE_URL}${mainImage}`,
            subImages
        })
        const create = await newProduct.save();
        return create;
    }
}

async function updateProduct(req) {
    try {
        const dataFiles = req.files
        const dataFields = req.body
        const mainImage = dataFiles?.mainImage.length > 0 ? dataFiles?.mainImage[0]?.path : ''
        const subImages = (dataFiles?.subImages && dataFiles?.subImages.length > 0) ? dataFiles?.subImages.map(i => `${process.env.BASE_URL}${i?.path}`) : []
        const product = await Product.findOne({ _id: dataFields._id });
        console.log([...product.subImages , ...subImages]);
        
        if (!product) throw new Error('Product not found')
        if (dataFiles) {
            if (mainImage) {
                const folderPath = './images';
                const fileName = product.mainImage.split('/').at(-1);
                const filePath = path.join(folderPath, fileName);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully.');
                    }
                });
                product.set({
                    ...dataFields,
                    mainImage: `${process.env.BASE_URL}${mainImage}`,
                    subImages : [...product.subImages , ...subImages]
                })
                const create = await product.save();
                return create;
            }
            else {
                product.set({
                    ...dataFields,
                    subImages : [...product.subImages , ...subImages]
                })
                const create = await product.save();
                return create;
            }
        }
        else {
            product.set(dataFields)
            const create = await product.save();
            return create;
        }
    } catch (err) {
        console.log("err" ,err);
        
        throw new Error("update fail" + JSON.stringify(err))
    }
}

async function deleteProduct({ id }) {
    try {
        const product = await Product.findOne({ _id: id });

        const folderPath = './images';
        const fileName = product.mainImage.split('/').at(-1);
        const filePath = path.join(folderPath, fileName);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
            } else {
                console.log('File deleted successfully.');
            }
        });
        const fileSubImages = product.subImages
        for (let i = 0; i < fileSubImages.length; i++) {
            const fileName = fileSubImages[i].split('/').at(-1);
            const filePath = path.join(folderPath, fileName);
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully.');
                }
            });
        }
        await product.deleteOne({ _id: id })
        return { msg: "Xoá thành công" }
    } catch (error) {
        console.log(error);

        throw new Error("delete fail" + JSON.stringify(error))
    }
}
module.exports = { getAllProduct, createProduct, updateProduct, deleteProduct }