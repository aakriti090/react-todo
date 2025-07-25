import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for the list of tasks
  const [tasks, setTasks] = useState([]);

  // State for the input field
  const [input, setInput] = useState('');

  // Load tasks from localStorage when the app starts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(stored);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (input.trim() === '') return; // Prevent adding empty task
    setTasks([...tasks, { text: input, done: false }]); // Add new task
    setInput(''); // Clear input field
  };

  // Function to delete a task by its index
  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  // Function to mark task as complete or undo it
  const toggleDone = (index) => {
    const updated = tasks.map((task, i) =>
      i === index ? { ...task, done: !task.done } : task
    );
    setTasks(updated);
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1 className="todo-title">To-Do List</h1>

        {/* Input section for typing and adding a task */}
        <div className="todo-input-group">
          <input
            type="text"
            placeholder="Enter a task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="todo-input"
          />
          <button onClick={addTask} className="todo-add-button">Add</button>
        </div>

        {/* Display the list of tasks */}
        <ul className="todo-list">
          {tasks.map((task, i) => (
            <li key={i} className="todo-item">
              {/* Task text */}
              <span className={`todo-text ${task.done ? 'done' : ''}`}>
                {task.text}
              </span>

              {/* Button to mark complete or undo */}
              <button onClick={() => toggleDone(i)} className="todo-button">
                {task.done ? 'Undo' : 'Complete'}
              </button>

              {/* Button to delete the task */}
              <button onClick={() => deleteTask(i)} className="todo-button delete">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
