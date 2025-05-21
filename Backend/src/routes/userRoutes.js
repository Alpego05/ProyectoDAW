const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const {verifyToken,checkRole} = require("./../middleware/authMiddleware");


userRouter.get("/",  userController.getAllUsers);
userRouter.get("/:id", verifyToken, userController.getUserById);
userRouter.delete("/delete/:id", verifyToken, userController.deleteUser);
userRouter.post("/login",  userController.login);  
userRouter.patch("/edit/:id", verifyToken, userController.updateUser);  

module.exports = userRouter;