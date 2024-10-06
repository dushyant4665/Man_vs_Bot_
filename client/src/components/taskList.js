import React, { useEffect, useState } from 'react';
import { getTasks, createTask } from '../api';

const TaskList = () => {
    const [tasks, setTasks] =useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await getTasks();
                setTasks(data);
            } catch (error) {
                console.error('Failed to fetch tasks', error);
            }
        };

        fetchTasks();
    }, []);

    const handleCreateTask = async (taskData) => {
        try {
            await createTask(taskData);
         
        } catch (error) {
            console.error('Failed to create task', error);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold">Task List</h2>
            <ul className="space-y-2">
                {tasks.map((task) => (
                    <li key={task._id} className="p-4 border rounded-lg">
                        <h3 className="text-xl">{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Status: {task.status}</p>
                        <p>Priority: {task.priority}</p>
                    </li>
                ))}
            </ul>
    </div>
   );
};
export default TaskList;
