const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const { status, priority, sort, limit = 10, skip = 0 } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  const tasks = await Task.find(filter)
    .sort(sort ? { [sort]: 1 } : {})
    .limit(parseInt(limit))
    .skip(parseInt(skip));

  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.json(task);
};

const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    description,
    status: status || 'TODO',
    priority,
    dueDate,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { ...req.body, updatedAt: new Date() },
    { new: true, runValidators: true }
  );

  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  res.status(204).send();
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
