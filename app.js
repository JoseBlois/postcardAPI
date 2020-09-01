const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const db = mongoose.connect('mongodb://localhost/bookAPI');
const Postcard = require('./src/models/postcardModel');

const postcardsRouter = require('./src/routes/postcardsRouter')(Postcard);

// app.use(express.static(path.join(__dirname, './public/')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/api', postcardsRouter);

app.get('/', (req, res) => {
  res.render('index');
});

// HOW DID I FORGET TO PASS IN PORT XDX
app.listen(port,
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${port}`));
