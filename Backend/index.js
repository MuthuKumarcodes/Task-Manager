const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const fs = require('fs'); 
const util = require('util');

const app = express();
const port = 3001;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());

const connectionUrl = 'mysql://root:root@127.0.0.1:3306/Haatch';
const connectionParams = new URL(connectionUrl);
const dbName = connectionParams.pathname.substring(1);

const pool = mysql.createPool({
    host: connectionParams.hostname,
    user: connectionParams.username,
    password: connectionParams.password,
    database: dbName,
    port: connectionParams.port,
});

app.get('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM tasks WHERE id = ?', [id]);
        connection.release();

        if (rows.length === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(rows[0]);
        }
    } catch (err) {
        console.error('Error querying task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/tasks', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [rows] = await connection.execute('SELECT * FROM tasks');
        connection.release();

        // Convert image Buffer to base64-encoded string
        const tasksWithBase64Images = rows.map((task) => {
            if (task.image instanceof Buffer) {
                const base64Image = task.image.toString('base64');
                return { ...task, image: base64Image };
            }
            console.log(task,"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
            return task;
        });

        res.json(tasksWithBase64Images);
    } catch (err) {
        console.error('Error querying tasks:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/tasks', async (req, res) => {
    const { heading, description, date, time, priority, image } = req.body;

    if (!heading || !description || !date || !time || priority === undefined) {
        return res.status(400).json({ error: 'Missing or invalid fields' });
    }

    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();

        const insertTaskQuery = 'INSERT INTO tasks (heading, description, date, time, priority, image) VALUES (?, ?, ?, ?, ?, ?)';
        const insertTaskValues = [heading, description, date, time, priority, image];
        
        const [insertResult] = await connection.execute(insertTaskQuery, insertTaskValues);

        const insertedTaskId = insertResult.insertId;

        await connection.commit();
        connection.release();

        res.json({ message: 'Task added successfully', id: insertedTaskId });
    } catch (err) {
        console.error('Error adding task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.put('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    const { heading, description, date, time, image, priority } = req.body;

    try {
        const connection = await pool.getConnection();
        await connection.execute(
            'UPDATE tasks SET heading=?, description=?, date=?, time=?, image=?, priority=? WHERE id=?',
            [heading, description, date, time, image, priority, id]
        );
        connection.release();
        res.json({ message: 'Task updated successfully' });
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const connection = await pool.getConnection();
        await connection.execute('DELETE FROM tasks WHERE id = ?', [id]);
        connection.release();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
