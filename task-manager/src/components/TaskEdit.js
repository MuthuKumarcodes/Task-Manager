import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function TaskEdit() {
    const { id } = useParams();

    const [task, setTask] = useState({
        heading: '',
        description: '',
        priority: '',
        date: '', 
        time: '', 
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/tasks/${id}`).then((response) => {
            const taskData = response.data;
            setTask({
                heading: taskData.heading,
                description: taskData.description,
                priority: taskData.priority,
                date: taskData.date, 
                time: taskData.time, 
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
        const file = e.target.files[0];
    
        if (!file) {
            return;
        }
    
        const reader = new FileReader();
    
        reader.onload = (event) => {
            const imageData = event.target.result;
    
            setTask({
                ...task,
                image: imageData, 
            });
        };
    
        reader.readAsDataURL(file);
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:3001/api/tasks/${id}`, task).then((response) => {
            alert('Task Updated Successully')
            window.location.href = '/';
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
            <div id='link'>
                
            <Link id='home' to="/"> Home</Link>
            </div>
        </div>
    );
}

export default TaskEdit;
