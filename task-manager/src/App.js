import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Switch here
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskEdit from './components/TaskEdit';
import TaskDetail from './components/TaskDetail';
import Demo from './components/demo';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Task Manager</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<TaskList/>} />
            <Route path="/add" element={<TaskForm/>} />
            <Route path="/edit/:id" element={<TaskEdit/>} />
            <Route path="/task/:id" element={<TaskDetail/>} />
            <Route path='/demo' element={<Demo/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
