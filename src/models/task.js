const mongoose=require('mongoose')
const validator=require('validator')

const Tasks= mongoose.model('Tasks',{
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:false
    }
})

module.exports = Tasks