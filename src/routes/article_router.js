var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const { asyncHandle } = require('../utils/asyncHandle.js')
const { upload } = require('../utils/uploadImgHandle.js')
const {
    createMenuArticle,
    getArticle,
    getDetailArticle,
    editArticle,
    deleteArticle,
    createNewImage
} = require('../controller/article_controller.js');




router.get('/:id', asyncHandle(getDetailArticle));

router.post('/', upload.single('image'), asyncHandle(createMenuArticle));
// router.post('/:id/upload-image', , asyncHandle(createNewImage));
router.get('/', asyncHandle(getArticle));
router.put('/:id', asyncHandle(editArticle));
router.delete('/:id', asyncHandle(deleteArticle));


module.exports = router;

