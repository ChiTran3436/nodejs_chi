const MyModel = require('../models/article_model')
const slugify = require('slugify')

const createArticle = async ({ name, description, category_id }) => {
    return await MyModel.create({
        name,
        description,
        category_id,
    })
}
const getAllArticle = async ({
    page, limit, keyword, status
}) => {
    let query = {}

    if (status == 'active' || status == 'inactive') {
        query['status'] = status
    }

    const articles = await MyModel
        .find(query)
        .populate('category_id')
        .sort({ ordering: 1 })

    return {
        data: articles
    }
}



const createImage = async ({ id, imagePath }) => {
    if (!id || !imagePath) {
        throw new Error(' bắt buộc');
    }
    const article = await MyModel.findById(id);
    if (!article) {
        throw new Error('Không tìm thấy bài viết');
    }
    article.image = imagePath;
    await article.save();
    return article;
};

const findByIdArticle = async ({ id }) => {
    return await MyModel.findById(id).populate('category_id')
}

const editByIdArticle = async (id, { name, description, image }) => {
    const article = await MyModel.findByIdAndUpdate(id, { name, description, image }, { new: true, runValidators: true });
    return article;
};

const deleteById = async (id) => {
    const article = await MyModel.findByIdAndDelete(id);
    return article;
};

module.exports = { createArticle, getAllArticle, findByIdArticle, editByIdArticle, deleteById, createImage }


