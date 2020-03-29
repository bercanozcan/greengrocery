const express = require('express');
const router = express.Router();

const Categories = require('../models/Category');

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find();
        res.json(categories);
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:categoryId', async (req, res) => {
    try {
        const categories = await Categories.findById(req.params.categoryId);
        res.json(categories);
    } catch (error) {
        res.json({ message: error });
    }
});

router.post('/', async (req, res) => {
    const category = new Categories({
        parent: req.body.parent,
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedCategory = await category.save();
        res.json(savedCategory);
    } catch (error) {
        res.json({ message: error });
    }
});

router.delete('/:categoryId', async (req, res) => {
    try {
        const removedCategoryt = await Categories.remove({ _id: req.params.categoryId });
        res.json(removedCategoryt);
    } catch (error) {
        res.json({ message: error });
    }
});

router.patch('/:categoryId', async (req, res) => {
    try {
        const updatedCategory = await Categories.updateOne(
            { _id: req.params.categoryId },
            {
                $set: {
                    parent: req.body.parent,
                    title: req.body.title,
                    description: req.body.description
                }
            }
        );
        res.json(updatedCategory);
    } catch (error) {
        res.json({ message: error });
    }
});

module.exports = router;