const { Router } = require("express");
const {
  addNewTask,
  deleteTaskHandler,
  updateStatusHandler,
  updateTaskHandler,
} = require("../controllers/todo/todoControllers");
const { authChecker } = require("../middlware/auth/authMiddlware");
const todoRouter = Router();

//add a new task
todoRouter.post("/addNewTask", authChecker, addNewTask);

//delete task
todoRouter.get("/deleteTask/:taskId", authChecker, deleteTaskHandler);
//update status
todoRouter.get("/updateStatus/:taskId", authChecker, updateStatusHandler);
//update button
todoRouter.post("/updateTask", authChecker, updateTaskHandler);

module.exports = todoRouter;
