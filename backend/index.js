// backend/index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3002;

const Task = require('./models/Task');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// const MONGODB_URI = 'mongodb://localhost:27017/todoapp';
const MONGODB_URI = 'mongodb://pwcnew:7KLjl8v40FEScu8qoNTQnRCUzif9owslJOuZKjZ06xM5BgvNW14Lm9F4CvTpQ23mqCxiXPgZkESCACDbIykjcA==@pwcnew.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@pwcnew@/todoapp';
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},6000000);

// Get the default connection
const db = mongoose.connection;

// Event handlers for connection success and error
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define the '/api/tasks' route for creating tasks
app.post('/api/tasks', async (req, res) => {
  const { text } = req.body; // Use destructuring to get the 'text' property
  console.log('Received task:', text);

  try {
    const newTask = new Task({ text });
    await newTask.save();
    console.log('Task saved:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error saving task:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    await Task.findByIdAndDelete(id);
    res.status(204).send();
  });

// ... (other routes and code)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
