const { create, getAll, deleteById, update } = require('../services/menu_services')


const createMenu = async (req, res, next) => {
    await create(req.body)
    res.send({
        message: 'then moi thanh cong'
    })
}

const getAllMenu = async (req, res, next) => {
    let data = await getAll(req.query)
    res.send({
        message: 'get all thanh cong',
        data
    })
}
const deleteMenu = async (req, res, next) => {
    await deleteById(req.params)
    res.send({
        message: 'delete thanh cong'
    })
}
const updateMenu = async (req, res, next) => {
    await update(req.params, req.body)
    res.send({
        message: 'update thanh cong'
    })
}

module.exports = { createMenu, getAllMenu, deleteMenu, updateMenu }