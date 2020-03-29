const express = require('express');
const router = express.Router();

const Products = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:productId', async (req, res) => {
    try {
        const products = await Products.findById(req.params.productId);
        res.json(products);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/', async (req, res) => {
    const product = new Products({
        title: req.body.title,
        categories: req.body.categories,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        image: req.body.image
    });

    try {
        const savedProduct = await product.save();
        res.json(savedProduct);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/:productId', async (req, res) => {
    try {
        const removedProduct = await Products.remove({ _id: req.params.productId });
        res.json(removedProduct);
    } catch (error) {
        res.json({ message: error });
    }
});

router.patch('/:productId', async (req, res) => {
    try {
        const updatedProduct = await Products.updateOne(
            { _id: req.params.productId },
            {
                $set: {
                    title: req.body.title,
                    categories: req.body.categories,
                    description: req.body.description,
                    price: req.body.price,
                    stock: req.body.stock,
                    image: req.body.image
                }
            }
        );
        res.json(updatedProduct);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;