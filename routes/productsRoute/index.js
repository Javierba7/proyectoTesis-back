const router = require('express').Router();

const Product = require('../../models/products');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer');
const upload = multer();

const { uploadFile } = require('../../s3');

router.get('/', async (req, res) => {
    const { department = undefined } = req.query;
    try {
        if (department) {
            const products = await Product.find({ department });
            res.send(products);
        } else {
            const products = await Product.find();
            res.send(products);
        } 
    } catch(e) {
        res.status(404).send(e);
    }
});

router.post('/add', async (req, res) => {
    const result = await uploadFile(req, res);
});

router.put('/update/:id', async (req, res) => {
    console.log(req.body);
    try {
        const productUpdate = await Product.findByIdAndUpdate({_id: req.params.id}, req.body);
        res.send(productUpdate);
    } catch (e) {
        console.log(e);
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
    const deletedItem = await Product.findByIdAndDelete({ _id: req.params.id });
    res.send(deletedItem);
    } catch(e) {
        res.status(404).send(e);
    }
});

module.exports = router;