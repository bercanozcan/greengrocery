const express = require('express');
const app = express();
const port = 3002;
var expressHbs = require('express-handlebars');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use('/', require('./routes/index'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});