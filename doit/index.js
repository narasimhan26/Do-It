const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

connectDB();
const users = require('./routes/users');
const todos = require('./routes/todos');
const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/todos', todos);

app.listen(3001, () => {
  console.log("listening to port 3001!");  
});