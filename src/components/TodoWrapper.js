import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

// Default export for TodoWrapper
const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  // Function to add a new Todo
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  // Function to delete a Todo
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  // Function to toggle completion of a Todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
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
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo
      )
    );
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      {/* Display todos */}
      {todos.map((todo) => (
        <div key={todo.id}>  {/* Key should be on the parent of the returned element */}
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

export default TodoWrapper;  // Default export
