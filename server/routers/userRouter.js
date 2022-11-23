const express = require('express');
const router = express.Router();
const userFunctions = require('../middleware/userMiddleware');

router.post('/signup', userFunctions.signUp, (req, res) => {
    res.status(200).json(res.locals.result);
    return;
})

router.get('/login', userFunctions.logIn, (req, res) => {
    res.status(200).json(res.locals.result);
    return;   
})

router.get('/verify', userFunctions.verifyUser, (req, res) => {
    res.status(200).json(res.locals.result);
    return;  
})

module.exports = router;
