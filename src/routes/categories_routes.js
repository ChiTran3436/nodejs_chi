var express = require('express');
var router = express.Router();

const { asyncHandle } = require('../utils/asyncHandle.js')

const {
    getAllCategories,
    getDetailCategories,
    createCategories,
    editCategories,
    deleteCategories
} = require('../controller/categories_controller')

router.get('/', asyncHandle(getAllCategories));

router.get('/:id', asyncHandle(getDetailCategories));

router.post('/', asyncHandle(createCategories));

router.put('/:id', asyncHandle(editCategories));
router.delete('/:id', asyncHandle(deleteCategories));



module.exports = router;

