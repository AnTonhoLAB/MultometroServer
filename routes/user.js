const userModel = require('../modules/userModel');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post("/create", (req, res) => {
    const userToSave = req.body.user

    res.status(200).send(userToSave);
});



module.exports = router;