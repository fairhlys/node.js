// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, '书名必填'],
        unique: true,
        trim: true,
        minlength: [2, '书名至少2个字符'],
        maxlength: [100, '书名最多100个字符'],
    },
    author: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        min: [0, '价格不能为负'],
    },
    style: {
        type: String,
        enum: {
            values: ['言情', '都市', '志怪', '恐怖', '历史'],
            message: '风格必须是以下之一: {VALUES}',
        },
    },
    is_hot: Boolean,
    tags: [String],
    publishDate: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true, // 自动添加 createdAt / updatedAt
});

module.exports = mongoose.model('Book', bookSchema);