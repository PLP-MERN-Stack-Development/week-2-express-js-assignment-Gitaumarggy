// Connect to MongoDB via MongoDB Node.js Driver
const { MongoClient } = require('mongodb');


const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB(){
    await client.connect();
    return client.db('productdb').collection('products');
}

module.exports = connectDB;

