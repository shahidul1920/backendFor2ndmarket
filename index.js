const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    const feedbackCollection = database.collection("feedback");
    //userCollection.insertOne(user);
    //productCollection.insertOne(user);

    //getting product

    app.get("/products", async(req, res)=>{
      const query = {};
      const allProducts = await productCollection.find(query).toArray();
      res.send(allProducts)
    })

    app.get("/products/:proId", async(req, res)=>{
      const upUser = req.params.proId;
      const search = {uploaderID: upUser};
      const searchUser = await productCollection.find(search).toArray();
      res.send(searchUser)
    })

    //post user
    app.post("/users", async (req, res)=>{
      const userFromFirebase = req.body;
      const result = await userCollection.insertOne(userFromFirebase)
      res.send(result);
      
    })

    //get a single product
    app.get("/product/:name/:id", async(req, res)=>{
      const id = req.params.id;
      const findIdProd = {_Id: new ObjectId(id)};
      const searchProd = await productCollection.findOne(findIdProd);
      res.send(searchProd);
    })

    app.post("/feedback", async (req, res)=>{
      const feedbackFromUser = req.body;
      const result = await feedbackCollection.insertOne(feedbackFromUser);
      res.send(result);
    })

    app.get("/users", async (req, res)=>{
      const query = {};
      const allUserInfo = await userCollection.find(query).toArray()
      res.send(allUserInfo)
    })

    app.get("/shop/:id", async(req,res)=>{
      const productFilter = req.params.id.charAt(0).toUpperCase() + req.params.id.slice(1).toLowerCase();
      const findCat = {category: productFilter}
      const searchCat = await productCollection.find(findCat).toArray();
      res.send(searchCat)
    })

    //post product
    app.post("/products", async(req, res)=>{
      const upcomingProd = req.body;
      const result = await productCollection.insertOne(upcomingProd);
      res.send(result);      
    })

     
  } finally {
    //await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('New World!')
})


app.listen(port, () => {
  console.log(`final shop ${port}`)
})