const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config()

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('Server is running at port: '+ PORT)}
    );