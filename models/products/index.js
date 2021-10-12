const mongoose = require('mongoose');

const schema = mongoose.Schema;

const productSchema = new schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number
    },
    imgUrl: {
        type: String
    },
    department: {
        type: String
    }
});

module.exports = mongoose.model('Product', productSchema);
