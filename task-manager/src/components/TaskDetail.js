import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import axios from 'axios';

function TaskDetail() {
  const { id } = useParams(); // Get the "id" parameter from the route

  const [task, setTask] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3001/api/tasks/${id}`).then((response) => {
      setTask(response.data);
    });
  }, [id]); // Use the "id" parameter in the dependency array

  return (
    <div>
      <h2>Task Detail</h2>
      <h3>{task.heading}</h3>
      <p>{task.description}</p>
      <p>Date: {task.date}</p>
      <p>Time: {task.time}</p>
      <img src={task.imageUrl} alt="Task" />
    </div>
  );
}

export default TaskDetail;
