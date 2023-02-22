import { signIn, signUp,myUser } from "../controllers/UserController.js"
import { Router } from 'express'
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { SignUpSchema } from "../schemas/SignUpSchema.js";

const UserRouter = Router();

UserRouter.post("/signup", validateSchema(SignUpSchema), signUp);
UserRouter.post("/signin", signIn);
UserRouter.post("/users/me", myUser);


export default UserRouter;
