const { default: mongoose } = require('mongoose')
const { createArticle, getAllArticle, findByIdArticle, editByIdArticle, deleteById, createImage } = require('../services/article_services')
const { findById } = require('../services/categories_services')
const { BadRequestError } = require('../core/error_custom.js')
const { checkObjectId } = require('../utils/checkObjectId.js')
const { cloudinary } = require('../utils/cloudinaryHandle.js')
const fs = require('fs');



const createMenuArticle = async (req, res, next) => {

    try {
        const { folder = 'menu_articles' } = req.body;
        const article = await createArticle({ ...req.body })
        if (!req.file || !req.file.path) {
            throw new BadRequestError('File ảnh bắt buộc');
        }
        // Upload an image
        const uploadResult = await cloudinary.uploader
            .upload(req.file.path, {
                public_id: req.file.filename,
                folder: folder,

            }
            )

        const url = uploadResult.url
        await editByIdArticle(article.id, { image: url })
        fs.unlinkSync(req.file.path)
        res.send({
            message: 'then moi thanh cong'
        })
    } catch (error) {
        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path)
        }
        throw error;
    }
}

// const createNewImage = async (req, res, next) => {
//     const { id } = req.body;
//     const imagePath = req.file ? req.file.path : null;
//     if (!id || !imagePath) {
//         return res.status(400).send({ message: 'file ảnh bắt buộc' });
//     }
//     const article = await createImage({ id, imagePath });
//     res.send({
//         message: 'Tải ảnh lên thành công',
//         data: article
//     });
// };

const getArticle = async (req, res, next) => {
    res.status(200).send({
        message: ' thanh cong',
        data: await getAllArticle(req.query),

    });
}
const getDetailArticle = async (req, res, next) => {

    const { id } = req.params
    if (!checkObjectId(id)) throw new BadRequestError('Not Find Id')

    const article = await findByIdArticle(req.params)

    if (!article) throw new BadRequestError('Not Find Id')

    res.send({
        mes: 'lay  thanh cong',
        data: article,

    })

};
const editArticle = async (req, res, next) => {
    const { id } = req.params;

    if (!checkObjectId(id)) throw new BadRequestError('Not Find Id')

    const article = await findByIdArticle({ id });
    if (!article) throw new BadRequestError('Not found Id')

    await editByIdArticle(id, req.body);

    res.send({
        mes: 'Cập nhật thành công'
    });
};

const deleteArticle = async (req, res, next) => {
    const { id } = req.params;
    // 
    if (!checkObjectId(id)) throw new BadRequestError('Not Find Id')

    const article = await findByIdArticle({ id });
    if (!article) throw new BadRequestError('Not found Id')

    if (article.image) {
        const publicId = article.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
    }
    await deleteById(id);
    res.send({ mes: 'Xóa thành công' });
};
module.exports = { createMenuArticle, getArticle, getDetailArticle, editArticle, deleteArticle, }