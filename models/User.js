const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema ({
    name:{
        type:String,
        required:[true, 'please provide a name'],
        minlenght: 3,
        maxlenght: 50
    },

    email:{
        type:String,
        required:[true, 'please provide a email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please provide valid email.'],
        unique: true,
    },
    
    password:{
        type:String,
        required:[true, 'please provide a password'],
        minlenght: 3,
    },
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next()
})

UserSchema.methods.createJWT = function(){
    return jwt.sign({userId:this._id, name:this.name}, process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFETIME});
}

UserSchema.methods.comparePassword =  async function (passwordProvided){
    const isMatch = await bcrypt.compare(passwordProvided, this.password)
    return isMatch
}

module.exports = mongoose.model('User', UserSchema) 