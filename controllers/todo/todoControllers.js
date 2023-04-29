const Todo = require("../../models/Todo");

async function addNewTask(req, res) {
  try {
    const { taskName, priority, date } = req.body;
    const todo = new Todo({
      taskName,
      priority,
      date,
      status: "pending",
      user: req.email,
    });
    const result = await todo.save();
    if (result) {
      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
}

//delete task controller

async function deleteTaskHandler(req, res) {
  try {
    const taskId = req.params.taskId;
    const result = await Todo.findOneAndDelete({
      _id: taskId,
      user: req.email,
    });

    if (result) {
      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
}
module.exports = { addNewTask, deleteTaskHandler };
