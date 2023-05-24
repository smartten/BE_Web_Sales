const cloudinary = require('cloudinary').v2;

const deleteImageFromCloud = (entity) => {
    const fileName = entity.image.split('/').at(-1);
    const folder = 'smartten'
    cloudinary.uploader.destroy((folder + '/' + fileName).split('.')[0])
}

module.exports = { deleteImageFromCloud }