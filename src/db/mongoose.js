const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser:true,
    useCreateIndex:true

})

// const user= mongoose.model('User',{
//     name:{
//         type:String
//     },
//     age:{
//         type:Number
//     }
// })

const tasks= mongoose.model('Tasks',{
    description:{
        type:String
    },
    status:{
        type:Boolean
    }
})


const me=new tasks({
    description:'Wiped the Covenant',
    age:true
})

me.save().then(()=>{
    console.log(me)
}).catch((error)=>{
    console.log("Error!",error)
})