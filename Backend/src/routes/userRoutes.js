const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/",  userController.getAllUsers);
userRouter.get("/:id",  userController.getUserById);
userRouter.delete("/delete/:id", userController.deleteUser);
userRouter.post("/create",  userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.patch("/edit/:id", userController.editUser);

module.exports = userRouter;