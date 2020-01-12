const express = require('express')
require('./db/mongoose.js')
const User=require('./models/user.js')
const Task=require('./models/task.js')
const userRouter=require('./routers/user.js')
const taskRouter=require('./routers/task.js')
const jwt=require('jsonwebtoken')
const multer=require('multer')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports=app




