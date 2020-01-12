const request = require('supertest')
const app=require('../src/app')

test('Should signup a user',async()=>{
    await request(app).post('/users').send({
        name:"shantanu",
        email:"shantanu.chauhan29@gmail.com",
        password:"12345678"
    }).expect(201)
})