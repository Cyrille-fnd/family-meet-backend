import { Router } from "express";
import homeController from "./controller/home.controller";
import userController from "./controller/user.controller";
import authMiddleware from "./middleware/auth";

const expressRouter = Router();

expressRouter.get("/", homeController.home);
expressRouter.post("/users", userController.post);
expressRouter.post("/login", userController.login);
expressRouter.get("/users/:id", authMiddleware, userController.get);

export default expressRouter;
