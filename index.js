const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')


//middleware
app.use(cors());
app.use(express.json())


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
    const database = client.db("ProductsOfBC")
    const userCollection = database.collection("Users");
    const productCollection = database.collection("Products");
    //userCollection.insertOne(user);
    //productCollection.insertOne(user);

    //getting product

    app.get("/products", async(req, res)=>{
      const query = {};
      const allProducts = await productCollection.find(query).toArray();
      res.send(allProducts)
    })

    app.get("/electronics", async(req,res)=>{
      const findCat = {category: "Electronics"}
      const searchCat = await productCollection.find(findCat).toArray();
      res.send(searchCat)
    })

    //post product
    app.post("/products", async(req, res)=>{
      const upcomingProd = req.body;
      const result = await productCollection.insertOne(upcomingProd);
      res.send(result);
      console.log(req);
      
    })

     
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