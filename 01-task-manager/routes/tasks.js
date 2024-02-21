const express = require('express');
const app = express();
const route = express.Router();
const { 
        createTask,
        getAllTasks,
        getSingleTask,
        updateTask,
        deleteTask,
        deleteAllTasks
     } = require('../controller/tasks');

route.post('/', createTask);

route.get('/', getAllTasks);

route.get('/:id', getSingleTask);

route.patch('/:id', updateTask);

route.delete('/:id', deleteTask);

route.delete('/', deleteAllTasks);

// route.router('/').get(getAllTasks).post(createTask).delete(deleteAllTasks);
// route.router('/:id').get(getSingleTask).patch(updateTask).delete(deleteTask);

module.exports = route;