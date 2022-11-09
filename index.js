const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()

const app = express();
const port = process.env.PORT || 5000;

//middle ware
app.use(cors());
app.use(express.json())



const uri = `mongodb+srv://${process.env.RAKIBUL_USER}:${process.env.RAKIBUL_PASS}@cluster0.79y2pqi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        //collection of services
        const serviceCollection = client.db('rk-arcitecture').collection('services');
        //collection of review
        const reviewCollection = client.db('rk-arcitecture').collection('reviews');

        //service area
        app.get('/service', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const service = await cursor.limit(3).toArray()
            res.send(service)
        })


        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get("/services/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })

        //review area

        app.get('/reviews', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email,
                }
            }
            if (req.query.service) {
                query = {
                    service: req.query.service,
                }
            }
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray()
            res.send(reviews)
        })

        app.post("/reviews", async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review)
            res.send(result)
        })

    }
    finally {

    }
}

run().catch(err => console.error(err))



app.get("/", (req, res) => {
    res.send("Rakibul Architecture server is running");
})

app.listen(port, () => {
    console.log("Rakibul Architecture server running on:", port);
})



