const express = require('express');
const router = express.Router();
const got = require('got');

router.get('/', function (req, res, next) {

    (async () => {
        try {
            const response = await got('http://localhost:3001/products');
            res.render('shop/index', { title: 'Green Grocery', contents: JSON.parse(response.body) });
        } catch (error) {
            console.log(error);
        }
    })();


});

module.exports = router;