const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const port = 3001

app.use(cors());
app.use(bodyParser.json());

app.use('/products', require('./routes/products'));
app.use('/categories', require('./routes/categories'));


app.get('/', (req, res) => {
    res.send("Hello GreenGrocery");
});

app.get('/secret', isAuthorized, (req, res) => {
    res.json({ "message": "Süper secret message" });
});

app.get('/about', (req, res) => {
    res.json({ "message": "Hello GreenGrocery" });
});

app.get('/jwt', (req, res) => {
    let privateKey = fs.readFileSync('./private.pem', 'utf8');
    let token = jwt.sign({ "body": "stuff" }, privateKey, { algorithm: "HS256" });
    res.send(token);
});

function isAuthorized(req, res, next) {
    if (typeof req.headers.authorization !== 'undefined') {
        let token = req.headers.authorization.split(" ")[1];
        let privateKey = fs.readFileSync('./private.pem', 'utf8');
        jwt.verify(token, privateKey, { algorithm: "HS256" }, (err, decoded) => {
            if (err) {
                res.status(500).json({ error: "Not authorized" });
            }

            console.log(decoded);

            return next();
        });
    } else {
        res.status(500).json({ error: "Not authorized" });
    }
}

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to DB!');
});

app.listen(port, () => {
    console.log(`Started app on port ${port}`);
});