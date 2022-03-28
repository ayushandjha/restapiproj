require('dotenv').config();
const express = require('express');
const app = express();
const dbConnect = require('./dbConnect/dbconnect');
const port = process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');
const router = require('./routers/routers');
const cookieParser = require('cookie-parser');


const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
const staticPath = path.join(__dirname, '../static');


app.use(express.json());
app.use(express.urlencoded());


app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

app.use(cookieParser());

app.use(express.static(staticPath));
app.use(router);





app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
})
