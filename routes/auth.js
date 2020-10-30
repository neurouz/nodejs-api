const router = require("express").Router();
const User = require("../model/User");
const { RegisterUserValidation, LoginUserValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const { request } = require("express");
const jwt = require("jsonwebtoken");

router.post('/register', async (request, result) =>{
    // Validate the data
    try {
        await RegisterUserValidation(request.body);    
    } catch (error) {
        var message = error["details"][0]["context"]["label"];
        return result.status(406).send(message);
    }
    // Check if user exists
    const existingUser = await User.findOne({username: request.body.username});
    if(existingUser)
        return result.status(400).send("Korisničko ime '" + request.body.username + "' je zauzeto");

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(request.body.password, salt);

    const user = new User({
        firstName: request.body.firstName,
        lastName:  request.body.lastName,
        username:  request.body.username,
        password:  hashedPassword
    });
    try {
        const savedUser = await user.save();
        result.send(savedUser);
    } catch (error) {
        result.status(400).send(error);
    }    
});

router.post("/login", async (request, result) => {
    try {
        await LoginUserValidation(request.body);
    } catch (error) {
        var message = error["details"][0]["context"]["label"];
        return result.status(406).send(message);
    }

    // Check if user exists
    const user = await User.findOne({username: request.body.username});
    if(!user)
        return result.status(400).send("Korisničko ime ne postoji u bazi");

    const password = request.body.password;
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword)
        return result.status(400).send("Lozinka nije validna");

    var token = jwt.sign({ _id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, process.env.SECRET_KEY);
    result.header('auth-token', token);

    result.status(200).send({
        _id: user._id,
        username: user.username
    });    
});

module.exports = router;