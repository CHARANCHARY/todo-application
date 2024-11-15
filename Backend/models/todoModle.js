const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  todo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Progress", "Completed", "Done"],
    default: "Pending",
  },
}, { timestamps: true });

const Todo = mongoose.model("Todo", todoSchema);
module.exports = Todo;
