const { createArticle, getAllArticle, findByIdArticle, editByIdArticle, deleteById, createImage } = require('../services/article_services')
const { findById } = require('../services/categories_services')




const createMenuArticle = async (req, res, next) => {
    await createArticle(req.body)
    res.send({
        message: 'then moi thanh cong'
    })
}

const createNewImage = async (req, res, next) => {
    const { id } = req.body;
    const imagePath = req.file ? req.file.path : null;
    if (!id || !imagePath) {
        return res.status(400).send({ message: 'file ảnh bắt buộc' });
    }
    const article = await createImage({ id, imagePath });
    res.send({
        message: 'Tải ảnh lên thành công',
        data: article
    });
};

const getArticle = async (req, res, next) => {
    res.status(200).send({
        message: ' thanh cong',
        data: await getAllArticle(req.query),

    });
}
const getDetailArticle = async (req, res, next) => {
    const article = await findByIdArticle(req.params)

    res.send({
        mes: 'lay  thanh cong',
        data: article,

    })

};
const editArticle = async (req, res, next) => {
    const { name, description } = req.body;
    const { id } = req.params;
    if (!name || !description) {
        return res.status(400).send({ message: 'Name và description là bắt buộc' });
    }
    const article = await findByIdArticle({ id });
    if (!article) {
        return res.status(404).send({ message: 'Không tìm thấy bài viết' });
    }
    await editByIdArticle(id, { name, description });
    res.send({ mes: 'Cập nhật thành công' });
};

const deleteArticle = async (req, res, next) => {
    const { id } = req.params;
    const article = await findByIdArticle({ id });
    if (!article) {
        return res.status(404).send({ message: 'Không tìm thấy bài viết' });
    }
    await deleteById(id);
    res.send({ mes: 'Xóa thành công' });
};
module.exports = { createMenuArticle, getArticle, getDetailArticle, editArticle, deleteArticle, createNewImage }