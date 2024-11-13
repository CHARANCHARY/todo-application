import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const TodoList = ({ todos, handleDelete, handleEdit, handleStatusChange }) => {
  return (
    <ul className='todo-list'>
      {todos.map((t) => (
        <li className='Todo' key={t._id}>
          <span className='todoText'>{t.todo}</span>
          <select
            value={t.status}
            onChange={(e) => handleStatusChange(t._id, e.target.value)}
            className={`status-dropdown ${t.status.toLowerCase()}`}
          >
            <option value="Pending">Pending</option>
            <option value="Progress">Progress</option>
            <option value="Done">Done</option>
            <option value="Completed">Completed</option>
          </select>
          <button onClick={() => handleEdit(t._id)} className="edit-icon">
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
          <button onClick={() => handleDelete(t._id)} className="edit-icon">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
