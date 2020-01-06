//CRUD create read update delete

// const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient

const { MongoClient, ObjectID }=require('mongodb')

const id= new ObjectID()
console.log(id)

const connectionURL='mongodb://127.0.0.1:27017'
const databaseName='task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log('Unable to connect to database!')
    }

    const db=client.db(databaseName)

    // db.collection('users').updateOne({
    //     _id:new ObjectID("5e0ed197c10dce5140cec9d6")
    // },{
    //     $inc:{
    //         age:1
    //     }
    // }).then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })

    db.collection('tasks').updateMany({
        Completed:false
    },{
        $set:{
            Completed:true
        }
    }).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error)
    })

})
