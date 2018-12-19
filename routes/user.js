const userModel = require('../modules/userModel');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post("/create", function(req, res) {
    const userToSave = req.body.user

    res.status(200).send(userToSave);
});

// //routes/user.js
// const express = require('express');
// const router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// /* GET user profile. */
// router.get('/profile', function(req, res, next) {
//     res.send(req.user);
// });

module.exports = router;