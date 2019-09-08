const mongoose = require('mongoose');
const user = mongoose.model('User');

const getIngredients = (req, res) => {
    console.log('hi');
    console.log(req.payload);
    if (req.payload && req.payload._id) {
        user.findById(req.payload._id).select('ingredients').exec((err, ingredients) => {
            if (!ingredients) {
                return res.status(404).json({ "message": "No ingredients saved for user " });
            } else if (err) {
                return res.status(404).json(err)
            } else {
                res.status(200).json(ingredients)
            }
        })
    }
    else {
        return res
            .status(404)
            .json({ "message": "User not found" });
    }
}

const createIngredient = (req, res) => {
    console.log(req.payload);
    if (req.payload && req.payload._id) {
        user
            .findById(req.payload._id)
            .select('ingredients')
            .exec((err, user) => {
                if (err) {
                    res
                        .status(400)
                        .json(err);
                } else {
                    doAddIngredient(req, res, user); 1
                }
            });
    } else {
        res
            .status(404)
            .json({ "message": "User not found e" });
    }

}

const doAddIngredient = (req, res, user) => {
    if (!user) {
        res.status(404).json({ "message": "user not found d" })
    }
    else {
        user.ingredients.push({ name: req.body.name });
        user.save((err, user) => {
            if (err) {
                res.status(400).json(err)
            } else {
                res.status(201).json(user)
            }
        })
    }
}

const deleteIngredient = (req, res) => {
    if(req.payload && req.payload._id){
    const userId = req.payload._id;
    const ingredientId = req.params.ingredientId;
    if (!userId || !ingredientId) {
        return res
            .status(404)
            .json({
                'message': 'Not found, userId and ingredientId are both required'
            });
    }
    user
        .findById(userId)
        .select('ingredients')
        .exec((err, user) => {
            if (!user) {
                return res
                    .status(404)
                    .json({ 'message': 'User not found c' });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }

            if (user.ingredients && user.ingredients.length > 0) {
                if (!user.ingredients.id(ingredientId)) {
                    return res
                        .status(404)
                        .json({ 'message': 'Ingredient not found' });
                } else {
                    user.ingredients.id(ingredientId).remove();
                    user.save(err => {
                        if (err) {
                            return res
                                .status(404)
                                .json(err);
                        } else {
                            res
                                .status(204)
                                .json(null);
                        }
                    });
                }
            } else {
                res
                    .status(404)
                    .json({ 'message': 'No Ingredient to delete' });
            }
        });
    } else {
        res
        .status(404)
        .json({ "message": "User not found b" });
    }
};


module.exports = {
    createIngredient, deleteIngredient, getIngredients
}