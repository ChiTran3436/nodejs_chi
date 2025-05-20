var express = require('express');
var router = express.Router();

router.use('/categories', require('./categories_routes'))
// router.use('/product' , require('./product_router'))

module.exports = router;


