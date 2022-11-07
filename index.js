const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config()

const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.RAKIBUL_USER}:${process.env.RAKIBUL_PASS}@cluster0.79y2pqi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





app.get("/", (req, res) => {
    res.send("Rakibul Architecture server is running");
})

app.listen(port, () => {
    console.log("Rakibul Architecture server running on:", port);
})



