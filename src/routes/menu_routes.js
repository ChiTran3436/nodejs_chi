var express = require('express');
var router = express.Router();


const { asyncHandle } = require('../utils/asyncHandle.js')

const { createMenu, getAllMenu, deleteMenu, updateMenu

} = require('../controller/menu_controller')



// router.get('/:id', asyncHandle(getDetailCategories));






router.post('/', asyncHandle(createMenu));

router.get('/', asyncHandle(getAllMenu));
router.delete('/:id', asyncHandle(deleteMenu));
router.put('/:id', asyncHandle(updateMenu));

module.exports = router;

