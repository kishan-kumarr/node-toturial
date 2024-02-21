const Task = require('../models/Task');

const createTask = async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json({'status': 201, 'msg': 'new task added', 'data': newTask});
    } catch (error) {
        res.status(500).json({'status': 500, 'msg': error});
    }
}

const getAllTasks = async (req, res) => {
    try{
        const allTask = await Task.find({});
        (!allTask) ? res.status(404).json({'status': 404, 'msg': `No task available`} ) : res.status(200).json({'status': 200, 'msg': "all tasks list", 'data': allTask });
    }catch(error) {
        res.status(500).json({'status': 500, 'msg': error});
    }
}

const getSingleTask = async (req, res) => {
    try {
        const _id = req.params.id;
        const singleTask = await Task.findById({ _id });
        (!singleTask) ? res.status(404).json({'status': 404, 'msg': `No task with this id: ${_id}`} ) : res.status(200).json({'status': 200, 'msg': "Tasks list", 'data': singleTask });
    } catch (error) {
        res.status(500).json({'status': 500, 'msg': error});  
    }
}

const updateTask = async (req, res) => {
    try {
        const _id = req.params.id;
        const updateTask = await Task.findByIdAndUpdate({_id }, req.body, {new: true, runValidators: true});
        (!updateTask) ? res.status(404).json({'status': 404, 'msg': `No task with this id: ${_id}`} ) : res.status(200).json({'status': 200, 'msg': "Update Task", 'data': updateTask });
    } catch (error) {
        res.status(500).json({'status': 500, 'msg': error})
    }
}

const deleteTask = async (req, res) => {
    try {
        const _id = req.params.id;
        const deleteTask = await Task.findByIdAndDelete({ _id });
        (!deleteTask) ? res.status(404).json({'status': 404, 'msg': `No task with this id: ${_id}`} ) : res.status(200).json({'status': 200, 'msg': "Deleted Task", 'data': {} });
    } catch (error) {
        res.status(500).json({'status': 500, 'msg': error})
    }
}

const deleteAllTasks = async (req, res) => {
    try {
        const deleteAllTask = await Task.deleteMany();
        res.status(200).json({'status': 200, 'msg': "All Task Deleted", 'data': {} });
    } catch (error) {
        res.status(500).json({'status': 500, 'msg': error})
    }
}

module.exports = { 
    createTask,
    getAllTasks,
    getSingleTask,
    updateTask,
    deleteTask,
    deleteAllTasks
 };