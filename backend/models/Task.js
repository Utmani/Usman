// backend/models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema); // Use 'Task' instead of 'tasks'
module.exports = Task; // Export the model as 'Task'
