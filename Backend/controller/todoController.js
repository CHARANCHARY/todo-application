const Todo = require("../models/todoModle");

// Add a new todo
const createTodo = async (req, res) => {
  const { todo, status = "Pending" } = req.body; // Default status is "Pending"
  try {
    const newTodo = new Todo({
      user: req.user.id,
      todo,
      status,
    });
    const saveTodo = await newTodo.save();
    res.status(201).json(saveTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all todos
const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update todo (including status update)
const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const { todo, status } = req.body; // Include status in request body
    const updatedTodo = { todo, status };

    const response = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const response = await Todo.findByIdAndDelete(todoId);
    if (!response) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  getAllTodo,
  deleteTodo,
};
