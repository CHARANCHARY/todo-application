import React, { useEffect, useState } from "react";
import axios from "axios";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import "./App.css";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Fetch todos when logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchTodos = async () => {
      if (!isLoggedIn) return;
      try {
        const response = await axios.get("/api/todos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        alert("Error fetching todos");
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo) return;

    if (editId) {
      try {
        await axios.put(
          `/api/todos/${editId}`,
          { todo },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const updatedTodos = todos.map((t) =>
          t._id === editId ? { ...t, todo } : t
        );
        setTodos(updatedTodos);
        setEditId(0);
        setTodo("");
      } catch (error) {
        console.error("Error updating todo:", error);
      }
    } else {
      try {
        const response = await axios.post(
          "/api/todos",
          { todo, status: "Pending" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTodos([response.data, ...todos]);
        setTodo("");
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((t) => t._id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `/api/todos/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      // Update the status in the local state
      const updatedTodos = todos.map((t) =>
        t._id === id ? { ...t, status } : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRegister = () => {
    setIsRegistering(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setTodos([]);
  };

  return (
    <div className="container">
      <div className="main">
        <h1>TODO LIST</h1>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        ) : null}
      </div>
      {isLoggedIn ? (
        <div className="TodoWrapper">
          <TodoForm
            handleSubmit={handleSubmit}
            setTodo={setTodo}
            todo={todo}
            editId={editId}
          />
          <TodoList
            todos={todos}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleStatusChange={handleStatusChange}
          />
        </div>
      ) : (
        <>
          {isRegistering ? (
            <RegisterForm onRegister={handleRegister} />
          ) : (
            <LoginForm onLogin={handleLogin} />
          )}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </button>
        </>
      )}
    </div>
  );
};

export default App;
