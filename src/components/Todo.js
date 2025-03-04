import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  return (
    <div className="Todo">
      <label className={`todo-item ${task.completed ? "completed" : "incompleted"}`}>
        {/* Checkbox to mark task as complete */}
        <input 
          type="checkbox" 
          checked={task.completed} 
          onChange={() => toggleComplete(task.id)} 
        />
        {/* Task Text */}
        <span className={task.completed ? "completed-task" : ""}>{task.task}</span>
      </label>
      
      <div>
        {/* Edit and Delete icons */}
        <FontAwesomeIcon 
          className="edit-icon" 
          icon={faPenToSquare} 
          onClick={() => editTodo(task.id)} 
        />
        <FontAwesomeIcon 
          className="delete-icon" 
          icon={faTrash} 
          onClick={() => deleteTodo(task.id)} 
        />
      </div>
    </div>
  );
};
