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



router.post('/', (req, res) => {
    const response = createSession(req.client, req.newSession);
    response.then((data) => {
        res.send({message: data.data.choices[0].text});
    });
});

module.exports = router;
