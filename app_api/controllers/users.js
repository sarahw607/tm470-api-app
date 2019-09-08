const mongoose = require('mongoose');
const user = mongoose.model('User');

const getUser = (req, res) => {
    user.findById(req.params.userId).exec((err, user) => {
        if (!user) {
            return res.status(404).json({ "message": "user not found" });
        } else if (err) {
            return res.status(404).json(err)
        } else {
            res.status(200).json(user)
        }
    })
};

// const createUser = (req, res) => {
//     user.create({
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password,
//         email: req.body.email
//     }, (err, user) => {
//         if (err) res.status(400).json(err)
//         else res.status(201).json(user)
//     })
// }

module.exports = {
    getUser
}