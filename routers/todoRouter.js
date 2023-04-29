const { Router } = require("express");
const {
  addNewTask,
  deleteTaskHandler,
} = require("../controllers/todo/todoControllers");
const { authChecker } = require("../middlware/auth/authMiddlware");
const todoRouter = Router();

//add a new task
todoRouter.post("/addNewTask", authChecker, addNewTask);

//delete task
todoRouter.get("/deleteTask/:taskId", authChecker, deleteTaskHandler);

module.exports = todoRouter;
