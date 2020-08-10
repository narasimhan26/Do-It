const ToDos = require('../models/todoModel'); 

exports.addTodo = async (req, res) => {
  try {
    const {title, description} = req.body;

    const newTodo = await ToDos.create({
      title,
      description,
      author: req.user.email
    });

    return res.status(201).json({
      success: true,
      data: newTodo
    });

  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

exports.getTodos = async (req, res) => {
  try {
    const todos = await ToDos.find({author: req.user.email});
    return res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
} 

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await ToDos.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({
        success: true,
        error: "No Transaction Found"
      });
    }

    await todo.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

exports.updateTodo = async (req, res, next) => {
  try {
    const todo = await ToDos.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: true,
        error: "No Transaction Found"
      });
    }

    if (todo.author !== req.user.email) {
      return res.status(401).json({
        success: true,
        error: "You are not Authorized to edit this"
      });
    }

    todo.set({
      ...req.body
    });

    await todo.save();

    return res.status(201).json({
      success: true,
      data: todo
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}