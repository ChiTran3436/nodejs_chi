const MyModel = require('../models/categories_models')
const slugify = require('slugify')
// tương tác với database



const findAll = async ({
    page = 1,
    limit = 20,
    sort = 'createdAt',
    sort_dir = 'desc',
    keyword = "",
    status,
} = {}) => {

    let query = {};
    if (status == 'active' || status == 'inactive') {
        query.status = status
    }
    if (keyword || keyword != '') {
        query.name = { $regex: keyword, $options: 'i' }
        // query.$or = [
        //     { 'name': { $regex: keyword, $options: 'i' } },
        //     { 'description': { $regex: keyword, $options: 'i' } },
        // ]
    }
    const sortBy = sort_dir == 'asc' ? { [sort]: 1 } : { [sort]: -1 }
    let offset = (page - 1) * limit

    // let data = await MyModel
    //     .find({})
    //     .sort(sortBy)
    //     .skip(offset)
    //     .limit(limit)

    // let total = await MyModel.countDocuments({})

    const [data, total] = await Promise.all([
        MyModel.find(query).sort(sortBy).skip(offset).limit(limit),
        MyModel.countDocuments(query),

    ])


    return {
        page,
        limit,
        total,
        data
    }
}
const findById = async ({ id }) => {
    console.log(id);

    return await MyModel.findById(id)
}

const findByName = async (name) => {
    return await MyModel.findOne({ name })
}
const create = async ({ name, description, status }) => {
    await MyModel.create({
        name,
        description,
        status,
    })
}
const editById = async (id, { name, description }) => {
    await MyModel.findOneAndUpdate(id, updateData, { new: true })
}
const deleteById = async (id) => {
    await MyModel.findByIdAndDelete(id)
}

module.exports = {
    findAll,
    findById,
    create,
    editById,
    deleteById,
    findByName,
}