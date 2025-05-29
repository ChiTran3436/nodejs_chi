var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

const { asyncHandle } = require('../utils/asyncHandle.js')

const {
    createMenuArticle,
    getArticle,
    getDetailArticle,
    editArticle,
    deleteArticle,
    createNewImage
} = require('../controller/article_controller.js');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});


const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ chấp nhận file ảnh JPEG, PNG hoặc GIF'), false);
    }
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});



router.get('/:id', asyncHandle(getDetailArticle));

router.post('/', asyncHandle(createMenuArticle));
router.post('/upload-image', upload.single('image'), asyncHandle(createNewImage));
router.get('/', asyncHandle(getArticle));
router.put('/:id', asyncHandle(editArticle));
router.delete('/:id', asyncHandle(deleteArticle));


module.exports = router;

