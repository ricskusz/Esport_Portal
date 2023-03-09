const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi');

const userSchema = new Schema({
    name: {
        type: String,
        min: 3,
        max: 255,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    }
});

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required()
    });

    return schema.validate(user);
}

const User = mongoose.model('user', userSchema);

module.exports = {
    User,
    validate
}