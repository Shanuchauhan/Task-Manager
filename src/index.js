const express = require('express')
require('./db/mongoose.js')
const User=require('./models/user.js')
const Task=require('./models/task.js')
const userRouter=require('./routers/user.js')
const taskRouter=require('./routers/task.js')
const jwt=require('jsonwebtoken')
const multer=require('multer')

const app = express()
const port=process.env.PORT || 3000

const upload=multer({
    dest:'images'
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)





app.listen(port,()=>{
    console.log('Server is up on port: '+port)
})

