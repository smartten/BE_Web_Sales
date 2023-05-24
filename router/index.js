const express = require('express')
const _ = require('lodash');
const Joi = require('joi');
const multer = require('multer')
const uploadCloud = require('../hepper/cloudinary.config')

const categoryController = require('../controllers/categoryController')
const accountController = require('../controllers/accountController')
const orderController = require('../controllers/orderController')
const bannerController = require('../controllers/bannerController')
const newsController = require('../controllers/newsController')
const productController = require('../controllers/productController')
const recruitController = require('../controllers/recruitController')
const feedbackController = require('../controllers/feedbackController')
const candidateController = require('../controllers/candidateController')

const router = express.Router()

const validate = (schema) => (req, res, next) => {
    const validSchema = _.pick(schema, ['params', 'query', 'body']);

    const object = _.pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' } })
        .validate(object);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        res.status(400).send({
            err: errorMessage
        })
        return 1;
    }
    Object.assign(req, value);
    return next();
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer(
    { storage: storage }
)

const { register } = require('../validate/user')

const { isAdmin, required } = require('../middlewares/auth.js')

//category
router.get('/category', categoryController.getAllCategory)
router.post('/category', categoryController.createCategory)
router.patch('/category', categoryController.updateCategory)
router.delete('/category/:id', categoryController.deleteCategory)

//account
router.get('/account', accountController.getAllAccount)
router.post('/account', accountController.createAccount)
router.patch('/account', accountController.updateAccount)
router.delete('/account/:id', accountController.deleteAccount)

//order
router.get('/order', orderController.getAllOrder)
router.post('/order', orderController.createOrder)

//banner
router.get('/banner', bannerController.getAllBanner)
router.post('/banner', uploadCloud.single('file'), bannerController.createBanner)
router.patch('/banner', uploadCloud.single('file'), bannerController.updateBanner)
router.delete('/banner/:id', bannerController.deleteBanner)

//new
router.get('/news', newsController.getAllNews)
router.post('/news', uploadCloud.single('file'), newsController.createNews)
router.patch('/news', uploadCloud.single('file'), newsController.updateNews)
router.delete('/news/:id', newsController.deleteNews)

//product
router.get('/product', productController.getAllProduct)
router.post('/product',uploadCloud.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 10 }
  ]) , productController.createProduct)
router.patch('/product',uploadCloud.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 10 }
  ]) , productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)

//recruit
router.get('/recruit', recruitController.getAllRecruit)
router.post('/recruit', recruitController.createRecruit)
router.patch('/recruit', recruitController.updateRecruit)
router.delete('/recruit/:id', recruitController.deleteRecruit)

//feedback
router.get('/feedback', feedbackController.getAllFeedBack)
router.post('/feedback', feedbackController.createFeedBack)
router.patch('/feedback', feedbackController.updateFeedBack)
router.delete('/feedback/:id', feedbackController.deleteFeedBack)

//candidate
router.get('/candidate', candidateController.getAllCandidate)
router.post('/candidate', candidateController.createCandidate)
router.patch('/candidate', candidateController.updateCandidate)
router.delete('/candidate/:id', candidateController.deleteCandidate)

module.exports = router