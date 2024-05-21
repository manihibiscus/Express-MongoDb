import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request body
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request body

const mongoUri = 'mongodb+srv://admin-mani:0ai8Qvny939dH9zv@cluster0.jt7hdhv.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(mongoUri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}

connectToDatabase();

app.get('/', (req, res) => {
  res.send('Welcome to my Express server with MongoDB Atlas using MongoClient!');
});

app.get('/items', async (req, res) => {
  try {
    const database = client.db('PracticeReact');
    const collection = database.collection('LoginUsers');
    const items = await collection.find({}).toArray();
    res.json(items);
  } catch (error) {
    res.status(500).send('Error fetching data from the database');
  }
});

app.post('/postItems', async (req, res) => {
  try {
    const newItem = req.body;
    console.log(newItem);
    const database = client.db('PracticeReact');
    const collection = database.collection('LoginUsers');
    const result = await collection.insertOne(newItem);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).send('Error inserting data into the database');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
