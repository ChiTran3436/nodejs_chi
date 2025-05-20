const mongoose = require('mongoose')
const { Schema, model } = mongoose;


const categorySchema = new Schema({
    name: String,
    description: String,
    slug: String,
    status: String,
});


module.exports = model('categories', categorySchema);