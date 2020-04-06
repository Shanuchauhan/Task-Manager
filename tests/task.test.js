const request = require('supertest')
const jwt=require('jsonwebtoken')
const app=require('../src/app')
const Task=require('../src/models/task')

const {userOne,userOneId,userTwoId,userTwo,taskOne,taskTwo,taskThree,setupDatabase}=require('./fixtures/db')

beforeEach(setupDatabase)

test('Should create task for user',async()=>{
    const response=await request(app)
        .post('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            description:'Creating new task'
        })
        .expect(201)

    const task=await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})


test('Request all tasks for a user',async()=>{
    const response=await request(app)
        .get('/tasks')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    await expect(response.body.length).toEqual(2)    
})

test('Should not delete other users tasks', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send() 
        .expect(404)
    const task = await Task.findById(taskOne._id)
    await expect(task).not.toBeNull()
})