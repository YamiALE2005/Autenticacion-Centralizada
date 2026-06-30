require('dotenv').config();
const conectarDB = require("./src/config/database");
conectarDB();
const express = require("express");

const app = express();

const PORT  = 5100;

app.listen(PORT,() => {
    console.log("Hello World")
});