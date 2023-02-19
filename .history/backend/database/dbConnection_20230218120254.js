const { MongoClient } = require("mongodb");

// Connection URI
const uri = "mongodb+srv://aksarabayyapu:tuU9QKhnEMmKQk7x@mymongodb.8lq7t4k.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne({});
    console.log(`New listing created with the following id: ${result.insertedId}`);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


await createListing(client,
  {
      name: "Lovely Loft",
      summary: "A charming loft in Paris",
      bedrooms: 1,
      bathrooms: 1
  }
);
