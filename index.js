const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');


//middleware



const uri = `mongodb+srv://${process.env.MONGO_userID}:${process.env.MONGO_pass}@cluster0.kfgpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const user = {name: "shakil", email: "shakil@basmaki.com"}

async function run() {
  try {
    await client.connect();
    const database = client.db("ProductsOfBC")
    const userCollection = database.collection("Users");
    userCollection.insertOne(user);

     
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello fucking World!')
})


app.listen(port, () => {
  console.log(`final shop ${port}`)
})