import { signIn, signUp } from "../controllers/UserController.js"
import { Router } from 'express'
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { SignUpSchema } from "../schemas/SignUpSchema.js";
import { SignInSchema } from "../schemas/SignInSchema.js";

const UserRouter = Router();

UserRouter.post("/signup", validateSchema(SignUpSchema), signUp);
UserRouter.post("/signin", validateSchema(SignInSchema), signIn);



export default UserRouter;