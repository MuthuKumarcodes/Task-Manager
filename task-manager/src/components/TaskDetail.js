import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function TaskDetails() {
    const { id } = useParams();
    const [task, setTask] = useState({
        heading: '',
        description: '',
        priority: '',
        date: '',
        time: '',
        image: '', // Add image field to state
    });

    useEffect(() => {
        axios.get(`http://localhost:3001/api/tasks/${id}`).then((response) => {
            const taskData = response.data;
            console.log(taskData)
            setTask({
                heading: taskData.heading,
                description: taskData.description,
                priority: taskData.priority,
                date: taskData.date,
                time: taskData.time,
                image: taskData.image, // Set the image from the API response
            });
        });
    }, [id]);

    return (
        <div>
            <h2>Task Details</h2>
            <p>Heading: {task.heading}</p>
            <p>Description: {task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Date: {task.date}</p>
            <p>Time: {task.time}</p>
            <p>Image:</p>
            {task.image && (
                <img
                    src={`data:/;base64,${task.image}`}
                    alt="Task"
                    style={{ maxWidth: '100px' }}
                />
            )}
            <Link to="/">Back to Task List</Link>
        </div>
    );
}

export default TaskDetails;
