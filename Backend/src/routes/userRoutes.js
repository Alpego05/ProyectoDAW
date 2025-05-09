const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.post("/login", userController.login);  
userRouter.patch("/edit/:id", userController.updateUser);  

module.exports = userRouter;