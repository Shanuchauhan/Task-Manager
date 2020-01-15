const request = require('supertest')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const app=require('../src/app')
const User=require('../src/models/user')
const {userOne,userOneId,setupDatabase}=require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a user',async()=>{
    const response=await request(app).post('/users').send({
        name:"shantanu",
        email:"shantanu.chauhan29@gmail.com",
        password:"12345678"
    }).expect(201)

    //Assert that the database was changed correctly
    const user=await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

})

test('Should Login Existing user',async()=>{
    const response=await request(app).post('/users/login').send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)

    const user=await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('Test Login Failure',async()=>{
    await request(app).post('/users/login').send({
        email:userOne.email,
        password:'qrwq'
    }).expect(400)
})

test('Test for getting profile of user',async()=>{
    await request(app)
        .get('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Test for token error',async()=>{
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should post avatar picture',async()=>{
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .attach('avatar','tests/fixtures/profile-pic.jpg')
        .expect(200)
    
    const user=await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Test for deleting user',async()=>{
    await request(app)
        .delete('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user=User.findById(userOneId)
    expect(user).toBeNull    
})

test('Test for failing authorization for deleting a user',async()=>{
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})



test('Should update valid user fields',async()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            name:'Gandalf The White'
        })
        .expect(200)

    const user=await User.findById(userOneId)
    expect(user.name).toBe('Gandalf The White')
})

test('Should not update for invalid user fields',async()=>{
    await request(app)
        .patch('/users/me')
        .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
        .send({
            location:'Gandalf The White'
        })
        .expect(400)
})