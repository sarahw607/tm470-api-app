const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
})
const ctrlUsers = require('../controllers/users');
const ctrlIngredients = require('../controllers/ingredients');
const ctrlAuth = require('../controllers/auth');

// router.route('/users/:userId').get(auth, ctrlUsers.getUser);

router.route('/users/ingredients').post(auth, ctrlIngredients.createIngredient).get(auth, ctrlIngredients.getIngredients);

router.route('/users/ingredients/:ingredientId').delete(auth, ctrlIngredients.deleteIngredient);

router.post('/register', ctrlAuth.register);

router.post('/login', ctrlAuth.login);

module.exports =  router 
