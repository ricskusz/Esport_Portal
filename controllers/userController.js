const sendEmail = require('../utils/email');
const {User, validate} = require('../models/user');
const crypto = require('crypto');
const Token = require('../models/token');
const asyncHandler = require('express-async-handler');

const register = asyncHandler( async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    console.log(user);
    if(user) return res.status(400).send("Ezen az e-mail címen már létezik felhasználó!");

    user = await User.create({
        name: req.body.name,
        email: req.body.email
    });

    let token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
    });

    const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
    await sendEmail(user.email, "Verify email", message);
    res.send("Megerősítő emailt küldtünk.");
});

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id
        });
        if(!user) return res.status(400).send("Invalid link");
    
        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");
        await User.updateOne({
            _id: user._id,
            verified: true
        });
        await Token.FindByIdAndRemove(token._id);
        res.send("Email sikeresen jóváhagyva");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    register,
    verifyEmail
}
