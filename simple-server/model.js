const mongoose = require('mongoose');
const { host, port, database } = require('./config');

mongoose.connect(`mongodb://${host}:${port}/${database}`);
const model = mongoose.model('Todo', {
  id: String,
  title: String,
  finished: Boolean,
});

const seed = require('./data.json');
seed.todos.forEach(async row => {
  const todo = await model.findOne({ id: row.id });
  if (!todo) {
    const newTodo = new model(row);
    newTodo.save();
  }
});

module.exports = model;
