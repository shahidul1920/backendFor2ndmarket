const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');




const uri = `mongodb+srv://${process.env.MONGO_userID}:${process.env.MONGO_pass}@cluster0.kfgpk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello fucking World!')
})


app.listen(port, () => {
  console.log(`final shop ${port}`)
})