const mongoose = require('mongoose');
const user = mongoose.model('User');

// const getUser = (req, res) => {
//     user.findById(req.params.userId).exec((err, user) => {
//         if (!user) {
//             return res.status(404).json({ "message": "user not found a" });
//         } else if (err) {
//             return res.status(404).json(err)
//         } else {
//             res.status(200).json(user)
//         }
//     })
// };


module.exports = {
    // getUser
}