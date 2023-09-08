import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TaskList.css';

function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        axios.get('http://localhost:3001/api/tasks').then((response) => {
            setTasks(response.data);
            console.log('Task Readed successfully from frontend:', response.data);
        });
    }, []);

    const filterTasks = () => {
        if (filter === 'all') return tasks;
        return tasks.filter((task) => task.priority === filter);
    };

    const handleDelete = async (taskId) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/tasks/${taskId}`);

            if (response.status === 200) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
                console.log('Task deleted successfully:', response.data);
            } else {
                console.error('Error deleting task: Unexpected response status', response);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
            <div className="button-container">
                <Link to="/add" className="add-task-button">
                    Add Task
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Heading</th>
                        <th>Description</th>
                        <th>Priority</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>View</th>
                    </tr>
                </thead>
                <tbody>
                    {filterTasks().map((task) => (
                        <tr key={task.id}>
                            <td>{task.heading}</td>
                            <td>{task.description}</td>
                            <td>{task.priority}</td>
                            <td>
                                {task.image && (
                                    <img
                                        src={`data:/;base64,${task.image}`}
                                        alt="Task"
                                        style={{ maxWidth: '100px' }}
                                    />
                                )}
                            </td>
                            <td>
                                <Link to={`/edit/${task.id}`}>Edit</Link>
                            </td>
                            <td>
                                <button id="del" onClick={() => handleDelete(task.id)}>
                                    Delete
                                </button>
                            </td>
                            <td>
                                <Link id='view' to={`/task/${task.id}`}>View Details</Link> {/* Add this button */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;
