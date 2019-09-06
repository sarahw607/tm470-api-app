const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true}
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    emailAdd: { type: String, required: true},
    password: { type: String, required: true},
    ingredients: [ingredientSchema]
});

mongoose.model('User', userSchema );

