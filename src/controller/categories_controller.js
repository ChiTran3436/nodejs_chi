const { findAll, findById, create, deleteById, findByName, editById } = require('../services/categories_services')



const getAllCategories = async (req, res, next) => {
    res.status(200).send({
        message: ' thanh cong',
        metadata: await findAll(req.query),

    });
}


const getDetailCategories = async (req, res, next) => {

    res.send({
        mes: 'lay  thanh cong',
        data: await findById(req.params),
    })

};

const createCategories = async (req, res, next) => {
    const createItem = await findByName(req.body.name)
    console.log(createItem);

    if (createItem) throw new Error("Da Ton Tai");

    await create(req.body)
    res.send({
        mes: 'them moi thanh cong'
    })
}
const editCategories = async (req, res, next) => {
    const { name, description } = req.body

    const { id } = req.params

    const categories = await editById({ id })
    if (!categories) throw new Error("Not find by Id");

    await editById(id, { name, description });

    res.send({
        mes: 'update thanh cong',

    })
}

const deleteCategories = async (req, res, next) => {
    const { id } = req.params

    const categories = await findById({ id })
    if (!categories) throw new Error("Not find by Id");

    await deleteById(id);

    res.send({
        mes: 'xoa thanh cong',

    })
}

module.exports = {
    getAllCategories,
    getDetailCategories,
    createCategories,
    editCategories,
    deleteCategories,
}