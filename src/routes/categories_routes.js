var express = require('express');
var router = express.Router();
const MyModel = require('../models/categories_models')
const slugify = require('slugify')

//  phan trang
//     page = 1 , limit = 10 ,
//     search => keyword
//     sort => ordering Number => 0 ,1 ,2 

// router.get('/', async function (req, res, next) {

//     let data = await MyModel.find({});

//     res.send({
//         mes: 'lay  thanh cong',
//         data
//     })

// });


router.get('/', async function (req, res, next) {
    try {
        const offset = parseInt(req.query.offset) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const keyword = req.query.keyword || '';
        const sort_by = req.query.sort_by || 'name';
        const sort_dir = req.query.sort_dir || 'asc';

        let query = {};
        if (keyword) {
            query.name = { $regex: keyword, $options: 'i' };
        }

        let sort = {};
        sort[sort_by] = sort_dir === 'desc' ? -1 : 1;

        const data = await MyModel
            .find(query)
            .sort(sort)
            .skip(offset)
            .limit(limit);

        res.send({
            message: ' thanh cong',
            data,

        });
    } catch (error) {
        res.send({
            message: 'khong thanh cong'
        });
    }
});



router.get('/:id', async function (req, res, next) {
    const { id } = req.params
    let data = await MyModel.findById(id);

    res.send({
        mes: 'lay  thanh cong',
        data
    })

});
router.post('/', async function (req, res, next) {
    const { name, description, status } = req.body
    const slug = slugify(name, { lower: true, strict: true });

    // dua name tao slug = (slugify)
    // status ()

    await MyModel.create({
        name,
        description,
        slug,
        status
    })
    res.send({
        mes: 'them moi thanh cong'
    })

});
router.put('/:id', async function (req, res, next) {
    const { name, description } = req.body
    const { id } = req.params

    let data = await MyModel.findByIdAndUpdate(id, {
        name,
        description
    });

    res.send({
        mes: 'update thanh cong',

    })

});
router.delete('/:id', async function (req, res, next) {
    const { id } = req.params

    let data = await MyModel.findByIdAndDelete(id);

    res.send({
        mes: 'xoa thanh cong',

    })

});



module.exports = router;

