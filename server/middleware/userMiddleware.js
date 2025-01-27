const db = require('../db/db');
const middleware = {};

// Sign Up
middleware.signUp = async (req, res, next) => {
    const { firstname, lastname, username, password } = req.body;
    const values = [firstname, lastname, username, password];
    const newSignupQuery = `INSERT INTO users(firstname, lastname, username, password)
    VALUES ($1, $2, $3, $4)
    RETURNING username;`;
    const signUpResult = await db.query(newSignupQuery, values);
    // const returnedUserName = signUpResult.rows[0].username;
    const returnedUserName = signUpResult.rows[0].username;
    res.locals.result = returnedUserName;
    return next();
}

// Log In
middleware.logIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const values = [username, password];
        const newLoginQuery = `SELECT * FROM users WHERE username = $1 AND password = $2;`;
        const loginResult = await db.query(newLoginQuery, values);
        console.log('IM INSIDE THE LOGIN MIDDLEWARE')
        if (loginResult.rowCount === 0) res.locals.result = 'Sorry that username or password are not correct';
        else res.locals.result = loginResult.rows[0].username;
        return next();
    } catch (err) {
        return next(err)
    }
}

// Session Authentication
middleware.verifyUser = (req, res, next) => {
    res.locals = { data: 'I am getting verified!' }
    next();
    return;
}


module.exports = middleware;