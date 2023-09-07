# Task Manager

Task Manager is a web application for managing tasks and to-do lists.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- Git: [Download and Install Git](https://git-scm.com/)

## Getting Started

To get a local copy up and running, follow these steps.

### Frontend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/MuthuKumarcodes/Task-Manager.git
   ```

2. Navigate to the frontend directory:

   ```bash
   cd Task-Manager/task-manager
   ```

3. Install frontend dependencies:

   ```bash
   npm install
   ```

4. Start the frontend application:

   ```bash
   npm start
   ```

   The frontend should now be running on `http://localhost:3000`.

### Backend Setup

1. Clone the repository (if you haven't already):

   ```bash
   git clone https://github.com/MuthuKumarcodes/Task-Manager.git
   ```

2. Navigate to the backend directory:

   ```bash
   cd Task-Manager/backend
   ```

3. Install backend dependencies:

   ```bash
   npm install
   ```

4. Configure the backend:

   - Set up your database configuration in `config.js`.
   - Make any other necessary configuration changes.

5. Push the schema structure (run this command before starting the backend):

   ```bash
   npm run push
   ```

6. Start the backend server:

   ```bash
   npm start
   ```

   The backend should now be running on `http://localhost:3001`.

## Usage

- Open your web browser and go to `http://localhost:3000` to access the Task Manager application.
- Use the application to manage tasks, add new tasks, edit existing tasks, and delete tasks.
