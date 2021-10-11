const router = require('express').Router();

const Product = require('../../models/products');
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
    /*
    const { image } = req.files
    const uploadedFile = await uploadFile(req.files);
    console.log(uploadedFile);
    //mandar a llamar la funcion para traer la url del servicio

    */
    const newProduct = new Product({...req.body});

    try {
        const savedProduct = await newProduct.save();
        res.send(savedProduct);
    } catch(e) {
        res.status(404).send(e);
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