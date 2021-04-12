// app.js
const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, 'public');
app.set('view engine', 'hbs');
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));

app.listen(3000);