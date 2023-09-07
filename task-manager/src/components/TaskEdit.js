import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TaskEdit() {
    const { id } = useParams();

    const [task, setTask] = useState({
        heading: '',
        description: '',
        priority: '', // Add priority to the initial state
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/tasks/${id}`).then((response) => {
            const taskData = response.data;
            setTask({
                heading: taskData.heading,
                description: taskData.description,
                priority: taskData.priority, // Set the priority from the API response
            });
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({
            ...task,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        setTask({
            ...task,
            image: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3001/api/tasks/${id}`, task).then((response) => {
            console.log('Task updated successfully:', response.data);
        });
    };

    return (
        <div>
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="heading"
                    placeholder="Heading"
                    onChange={handleChange}
                    value={task.heading}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={task.description}
                />
                <div>
                    <label htmlFor="priority">Priority:</label>
                    <select
                        name="priority"
                        onChange={handleChange}
                        value={task.priority}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={task.date}
                />
                <input
                    type="time"
                    name="time"
                    onChange={handleChange}
                    value={task.time}
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button type="submit">Update Task</button>
            </form>
        </div>
    );
}

export default TaskEdit;
