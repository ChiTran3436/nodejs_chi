var express = require('express');
var router = express.Router();

router.use('/categories', require('./categories_routes'))
// router.use('/product' , require('./product_router'))
router.use('/menu', require('./menu_routes'))
router.use('/article', require('./article_router'))

module.exports = router;


