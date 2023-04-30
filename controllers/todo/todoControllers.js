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

//update status  controller

async function updateStatusHandler(req, res) {
  try {
    const taskId = req.params.taskId;

    const task = await Todo.findOne({
      _id: taskId,
      user: req.email,
    });
    const status = task.status === "pending" ? "completed" : "pending";
    const result = await Todo.findOneAndUpdate(
      {
        _id: taskId,
        user: req.email,
      },

      {
        $set: {
          status,
        },
      }
    );

    if (result) {
      return res.redirect("/");
    }
  } catch (error) {
    throw error;
  }
}

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
async function updateTaskHandler(req, res) {
  try {
    const { taskName, priority, date, id } = req.body;
    console.log(taskName, priority, date, id);
    const result = await Todo.findOneAndUpdate(
      {
        _id: id,
        user: req.email,
      },
      {
        $set: {
          taskName,
          priority,
          date,
        },
      }
    );

    res.redirect("/");
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addNewTask,
  deleteTaskHandler,
  updateStatusHandler,
  updateTaskHandler,
};
