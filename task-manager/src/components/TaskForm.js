import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

function TaskForm() {
    const [newTask, setNewTask] = useState({
        heading: '',
        description: '',
        date: '',
        time: '',
        image: null,
        imageBytes: null,
        priority: 'low', // Default priority
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value); // Debug line
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
    
        setNewTask({
            ...newTask,
            image: file, // Set the image property with the selected file
        });
    
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = new Uint8Array(e.target.result);
            setNewTask({
                ...newTask,
                imageBytes: imageData,
            });
        };
        reader.readAsArrayBuffer(file);
    };
    

    const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
        heading: newTask.heading,
        description: newTask.description,
        date: newTask.date,
        time: newTask.time,
        priority: newTask.priority,
        image: newTask.imageBytes ? btoa(newTask.imageBytes) : null, // Encode image data as Base64
    };

    try {
        const response = await axios.post('http://localhost:3001/api/tasks', requestData);

        if (response.status === 200) {
            console.log('Task added successfully:', response.data);
            alert("Task Created Successfully");

            setNewTask({
                heading: '',
                description: '',
                date: '',
                time: '',
                image: null,
                imageBytes: null,
                priority: 'low',
            });
        } else {
            console.error('Error adding task: Unexpected response status', response);
        }
    } catch (error) {
        console.error('Error adding task:', error);
    }
};

    

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleSubmit}>
                {/* Input fields for task details */}
                <input
                    type="text"
                    name="heading"
                    placeholder="Heading"
                    onChange={handleChange}
                    value={newTask.heading}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    value={newTask.description}
                    required
                />
                <input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={newTask.date}
                    required
                />
                <input
                    type="time"
                    name="time"
                    onChange={handleChange}
                    value={newTask.time}
                    required
                />
                <div className="priority-container">
                    <label htmlFor="priority">Priority:</label>
                    <select
                        name="priority"
                        onChange={handleChange}
                        value={newTask.priority}
                        required
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>
                <input
                    type="file"
                    name="image" // This name attribute should match the server-side code
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />

                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default TaskForm;
