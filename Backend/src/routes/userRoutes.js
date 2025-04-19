const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const { verifyToken, checkRole } = require("./middlewares");

userRouter.get("/", verifyToken, userController.getAllUsers);
userRouter.get("/:id", verifyToken, userController.getUserById);
userRouter.delete("/delete/:id", verifyToken, checkRole(['admin']), userController.deleteUser);
userRouter.post("/create",  userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.patch("/edit/:id", verifyToken, checkRole(['admin']), userController.editUser);

module.exports = userRouter;