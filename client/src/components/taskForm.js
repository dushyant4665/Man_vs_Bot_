import React, { useState } from 'react';
import { createTask } from '../api'; 

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '',
    assignedUser: '',
  });

  const handleSubmit=async (e) => {
    e.preventDefault();
    try {
      await createTask(formData);

    }catch(error){
      console.error('Task creation failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        onChange={(e)=>setFormData({ ...formData, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      ></textarea>
      <select
        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <select
        onChange={(e)=>setFormData({ ...formData, status:e.target.value })}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input
        type="date"
        onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
      />
      <input
        type="text"
        placeholder="Assigned User"
        onChange={(e) => setFormData({ ...formData, assignedUser: e.target.value })}
      />
      <button type="submit">Create Task</button>
    </form>
  );
};
export default TaskForm;



// import React from 'react'

// export default function TaskForm() {
//   return (
//     <h1>Task Form Component</h1>
//   )
// }
