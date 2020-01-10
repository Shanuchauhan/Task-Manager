const mongoose=require('mongoose')
const validator=require('validator')

const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})


const Tasks= mongoose.model('Tasks',taskSchema)

module.exports = Tasks