const express = require('express');
const { getTasks, getTaskById, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const validateTask = require('../middlewares/validateTask');

const router = express.Router();

router.route('/')
  .get(getTasks)
  .post(validateTask, createTask);

router.route('/:id')
  .get(getTaskById)
  .put(validateTask, updateTask)
  .delete(deleteTask);

module.exports = router;
