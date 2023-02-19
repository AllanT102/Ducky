const { MongoClient } = require("mongodb");
// Connection URI
const uri = "mongodb+srv://aksarabayyapu:tuU9QKhnEMmKQk7x@mymongodb.8lq7t4k.mongodb.net/?retryWrites=true&w=majority";
// Create a new MongoClient
const client = new MongoClient(uri);
const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const router = express.Router();
const token = process.env.OPENAI_API_KEY;
const configuration = new Configuration({apiKey: token});
const openai = new OpenAIApi(configuration);

// given big chunk of text, call gpt to summarize main points & store as an array if there's not already one there
async function createSession(client, newSession){
  const result = await client.db("DuckyDB").collection("DuckyCo").insertOne(newSession);
  console.log(`New listing created with the following id: ${result.insertedId}`);
}

async function run(txt, arr) {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
    await createSession(client,
      {
          text: txt,
          keyElemArray: arr
      }
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

router.post('/', (req, res) => {
  // console.log(req.body);
    const response = run(req.body.txt, req.body.keyElemArray)
    .then(() => res.send({message:response}))
});

router.get('/', (req, res) => {
  console.log("this is body");
    const response = "hi"
    .then(() => res.send({message:response}))
});

module.exports = router;
