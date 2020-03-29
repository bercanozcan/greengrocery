const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    parent: {
        type: String,
        default: 0
    },
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Categories', ProductSchema);