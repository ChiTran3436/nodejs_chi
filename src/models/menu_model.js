const mongoose = require('mongoose');
const slugify = require('slugify');
const { Schema, model } = mongoose;


const MenuSchema = new Schema({
    name: String,
    slug: String,
    ordering: Number,
    status: {
        type: String,
        default: 'inactive',
        enum: {
            values: ['active', 'inactive'],
            message: '{VALUE} khong duoc su dung'
        },
    },
},
    {
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

MenuSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true })
    next()
})

module.exports = model('menus', MenuSchema);