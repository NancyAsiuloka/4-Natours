const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            // this only works on save
            validator: function() {
                return this.password === this.passwordConfirm;
            },
            message: 'Passwords are not the same!'
        }
    }
});

userSchema.pre('save', async function(next) {
//    Only run this fn if password was actually modified
    if (!this.isModified('password')) return next();

    // Hash the password with cust of 12
    this.password = await bcrypt.hash(this.password, 12)

    // Delete the passwordConfirm field
    this.passwordConfirm = undefined;
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;