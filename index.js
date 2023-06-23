const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const dotenv = require("dotenv").config()
const PORT = process.env.PORT || 3000;

const authRouter = require("./routes/authRoute.js");
const productRouter = require("./routes/productRoute");
const blogRouter = require("./routes/blogRoute");
const categoryRouter = require("./routes/prodcategoryRoute");
const brandRouter = require("./routes/brandRoute");
const { notFound, errorHandler } = require('./middlewares/errorHandler');
const cookieParser = require("cookie-parser");
dbConnect();
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/user', authRouter);
app.use('/api/product', productRouter);
app.use('/api/blog', blogRouter);
app.use('/api/category', categoryRouter);
app.use('/api/brand', brandRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log('Server is running at port: '+ PORT)}
    );