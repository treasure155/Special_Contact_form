const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Contact = require('./models/contact'); 

const app = express();

mongoose.connect('mongodb://localhost:27017/contactFormClass');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await Contact.create({ name, email, message });
    res.render('thank-you', { name });
  } catch (err) {
    console.error(err);
    res.send('There was an error saving your message.');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
