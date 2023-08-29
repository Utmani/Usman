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

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(error => {
  console.error('MongoDB connection error:', error);
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
