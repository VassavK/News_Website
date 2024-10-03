const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const port = 3000;

// Connect to MongoDB database
mongoose.connect('mongodb://localhost:27017/Website', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define user schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const User = mongoose.model('User_info', userSchema);

// Set up middleware to parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/login.html', function(req, res) {
  res.sendFile(path.join(__dirname, '/login.html'));
});

app.get('/website.html', (req, res) => {
  res.sendFile(path.join(__dirname, '/website.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  user.save()
    .then(() => res.send('Data stored successfully!'))
    .catch(err => console.log(err));
});

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
