import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the API on component mount
  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  // Function to add a new Todo
  const addTodo = (todo) => {
    const newTodo = { task: todo, completed: false, isEditing: false };

    fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => response.json())
      .then((data) => setTodos((prevTodos) => [...prevTodos, data]));
  };

  // Function to delete a Todo
  const deleteTodo = (id) => {
    fetch(`http://localhost:5000/todos/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
    });
  };

  // Function to toggle completion of a Todo
  const toggleComplete = (id) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    updatedTodo.completed = !updatedTodo.completed;

    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }).then(() => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    });
  };

  // Function to toggle the edit mode of a Todo
  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  // Function to edit the task of a Todo
  const editTask = (task, id) => {
    const updatedTodo = { ...todos.find((todo) => todo.id === id), task };

    fetch(`http://localhost:5000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    }).then(() => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, task, isEditing: false } : todo
        )
      );
    });
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {/* Display todos */}
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.isEditing ? (
            <EditTodoForm editTodo={editTask} task={todo} />
          ) : (
            <Todo
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoWrapper;
