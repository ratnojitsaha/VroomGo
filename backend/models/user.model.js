const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3, 'First name must be at least of 3 characters or long']
        },
        lastname : {
            type : String,
            required : true,
            minlength : [3, 'First name must be at least of 3 characters or long']
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        minlength:[3, 'Email must be at least 5 characters long']
      },
    password : {
        type : String,
        required : true,
        //min length is not required as we will be using jwt for authentication
        //minlength : [8, 'password must be of length 8'],
        select: false 
        //when user is to be find then by default it should not show up
    },
    socketId: {
        type : String,
        //required for sharing live location of the captain with 
        // the user will create same in captian too
    },    
})


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({
        _id : this._id
    },process.env.JWT_SECRET, {expiresIn : '24h'});
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);


module.exports = userModel;