const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controllers/users');
const ctrlIngredients = require('../controllers/ingredients');

router.route('/users').post(ctrlUsers.createUser);

router.route('/users/:userId').get(ctrlUsers.getUser);

router.route('/users/:userId/ingredients').post(ctrlIngredients.createIngredient);

router.route('/users/:userId/ingredients/:ingredientId').delete(ctrlIngredients.deleteIngredient);
module.exports =  router 
