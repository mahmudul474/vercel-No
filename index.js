const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://asss6:OxNn4r4reFfsJYai@softopark.ockrkce.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const categoryCollection = client.db("softopark").collection("category");
    const feturesProductCollection = client
      .db("softopark")
      .collection("feturesProduct");
      
    const ProductCollection = client.db("softopark").collection("products");

    app.get("/category", async (req, res) => {
      const data = await categoryCollection.find({}).toArray();
      res.send(data);
    });

    app.post("/product", async (req, res) => {
      const product = req.body;
      const result = await feturesProductCollection.insertOne(product);
      res.send(result);
    });
    app.get("/product/featured", async(req,res)=>{
      const data = await feturesProductCollection.find({}).toArray();
      res.send(data);
     })

 app.get("/product", async(req,res)=>{
  const data = await ProductCollection.find({}).toArray();
  res.send(data);
 })
 


  } finally {
  }
}
run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`API listening on PORT ${PORT} `);
});

app.get("/", (req, res) => {
  res.send("Hey this is my API running 🥳");
});

// Export the Express API
module.exports = app;
