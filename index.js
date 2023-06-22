const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 3000;

const authRouter = require("./routes/authRoute.js");
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require("cookie-parser");
dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Server is running at port: '+ PORT)}
    );