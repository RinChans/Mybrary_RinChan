
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const mongoose = require('mongoose');
mongoose.connect( process.env.DATABASE_URL, {
    useNewUrlParser : true
});

const db = mongoose.connection;
    db.on('error',error => console.log(error));
    db.once('open',()=> console.log('Connect to Mongoose'));

const app = express();
const indexRouter = require('./routes/index');


app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/',indexRouter);


const port = process.env.PORT || 3000;
app.listen(port);
console.log("Running"); 