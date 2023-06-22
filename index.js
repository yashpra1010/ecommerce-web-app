const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config()

const app = express();

const PORT = process.env.PORT || 3000;

app.use("/", (req,res)=>{
    res.send("Hello from server.")
})

app.listen(PORT, () => {
    console.log('Server is running at port: '+ PORT)}
    );