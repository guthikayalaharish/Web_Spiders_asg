const validateTask = (req, res, next) => {
    const { title, status, priority, dueDate } = req.body;
  
    if (!title || typeof title !== 'string' || title.length > 100) {
      return res.status(400).json({ message: 'Title is required and must be a string with a maximum length of 100 characters.' });
    }
  
    if (status && !['TODO', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      return res.status(400).json({ message: "Status must be one of ['TODO', 'IN_PROGRESS', 'COMPLETED']." });
    }
  
    if (priority && !['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
      return res.status(400).json({ message: "Priority must be one of ['LOW', 'MEDIUM', 'HIGH']." });
    }
  
    if (dueDate && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({ message: 'DueDate must be a valid date.' });
    }
  
    next();
  };
  
  module.exports = validateTask;
  