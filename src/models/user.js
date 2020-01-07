const mongoose = require('mongoose')
const validator = require('validator')


const User= mongoose.model('User',{
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email must be valid!')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error('Password cannot contain password keyword in it!')
            }
        }
    }, 
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('Age must be a positive number!')
            }
        }
    }
})

module.exports=User
