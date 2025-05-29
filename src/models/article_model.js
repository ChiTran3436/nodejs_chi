const mongoose = require('mongoose');
const slugify = require('slugify');
const { Schema, model } = mongoose;


const articleSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        unique: true,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    slug: String,
    status: {
        type: String,
        default: 'inactive',
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} khong duoc su dung'
        },
    },
    image: {
        type: String,
        default: null
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;

            const { id, ...res } = ret
            return { id, ...res }
        }
    }
});

articleSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

module.exports = model('Article', articleSchema);