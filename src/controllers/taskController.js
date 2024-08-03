const Task = require("../models/task");

// Create Task
const createTask = async (req, res) => {
  try {
    const task = new Task({ ...req.body, user_id: req.user.id });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Tasks (with filtering, searching, and pagination)
const getTasks = async (req, res) => {
  try {
    const { status, priority, search, page = 1, pageSize = 10 } = req.query;
    const query = { user_id: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search)
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];

    const tasks = await Task.find(query)
      .skip((page - 1) * pageSize)
      .limit(parseInt(pageSize));

    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.taskId, user_id: req.user.id },
      req.body,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      user_id: req.user.id,
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
