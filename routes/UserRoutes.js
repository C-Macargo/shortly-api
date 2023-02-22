import { signIn, signUp,myUser } from "../controllers/UserController.js"
import { Router } from 'express'


const UserRouter = Router();

UserRouter.post("/signup", signUp);
UserRouter.post("/signin", signIn);
UserRouter.post("/users/me", myUser);


export default UserRouter;
