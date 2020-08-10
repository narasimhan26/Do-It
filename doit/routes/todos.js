const express = require('express');
const router = express.Router();
const requireAuth = require('../middlewares/requireAuth');
const {getTodos, addTodo, deleteTodo, updateTodo} = require('../controllers/todosController');

router
  .route('/')
  .get(requireAuth, getTodos)
  .post(requireAuth, addTodo)

router
  .route('/:id')
  .delete(requireAuth, deleteTodo)
  .put(requireAuth, updateTodo)

module.exports = router;