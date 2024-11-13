import React from "react";

const TodoForm = ({ handleSubmit, setTodo, todo, editId }) => {
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        value={todo}
        placeholder="Enter Todo"
        onChange={(e) => setTodo(e.target.value)}
      ></input>
      <button type="submit" className="todo-btn">
        {" "}
        {editId ? "Edit" : "Add"}
      </button>
    </form>
  );
};

export default TodoForm;
