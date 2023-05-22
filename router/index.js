const express = require('express')
const _ = require('lodash');
const Joi = require('joi');
const multer = require('multer')
const User = require('../Entities/user.entities');

const userController = require('../controllers/userController')
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

const upload = multer({ storage: storage })

const { register  } = require('../validate/user')

const { isAdmin , required } = require('../middlewares/auth.js')

router.post('/upload-image' , upload.single('file') , (req ,res) => {
    const data = req.file
    console.log('data' ,data);
    
    res.json({ msg : 'ok' })
})

router.post('/multiples-image' , upload.array('files') , (req ,res) => {
    const data = req.files
    console.log('data' ,data);
    
    res.json({ msg : 'ok' })
})

// router.post('/login', userController.login)
// router.post('/register', userController.register)

// router.get('/delete' , async(req , res) => {
//     await User.deleteMany()
//     res.send("ok")
// })

// router.get('/user' , userController.getAllUser)

// router.get('/profile' , userController.getUser);
// router.patch('/update-profile', userController.updateUser);
// router.patch('/change-password', userController.updatePassword);

// router.patch('/profile', userController.update);

// router.patch('/generate-code' , userController.generateCodeWithUser)
// router.patch('/active-account' , userController.activeAccount)



module.exports = router