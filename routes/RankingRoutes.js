import { ranking } from "../controllers/RankingController.js"
import { Router } from 'express'


const RankingRouter = Router();

RankingRouter.get("/ranking", ranking);

export default RankingRouter;
