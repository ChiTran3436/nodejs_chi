const MyModel = require('../models/menu_model')
const slugify = require('slugify')

const create = async ({ name, ordering, status }) => {
    await MyModel.create({
        name,
        ordering,
        status,
    })
}

const getAll = async ({
    page, limit, keyword, status
}) => {
    let query = {}

    if (status == 'active' || status == 'inactive') {
        query['status'] = status
    }

    return await MyModel.find(query).sort({ ordering: 1 })
}

const deleteById = async ({ id }) => {
    return await MyModel.findByIdAndDelete(id)
}

const update = async ({ id }, { name, ordering, status }) => {
    return await MyModel.findByIdAndUpdate(id, { name, ordering, status })

}

module.exports = { create, getAll, deleteById, update }