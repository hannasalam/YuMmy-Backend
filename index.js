const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
var userController= require('./controllers/userController');
var cartController= require('./controllers/cartController');
dotenv.config(); 

    mongoose.connect(
    'mongodb+srv://hanna:testpassword@cluster0.3syft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true, 
      });

app.use(express.json());
// app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: true}));
   
userController(app);
cartController(app);

app.listen(3000);
console.log('You are listening to port 3000');