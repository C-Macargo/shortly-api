import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./routes/UserRoutes.js";
import UrlRouter from "./routes/UrlRoutes.js";
import RankingRouter from "./routes/RankingRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use([UserRouter]);
app.use([UrlRouter]);
app.use([RankingRouter]);


app.listen(process.env.PORT, () =>
	console.log("Server running on port " + process.env.PORT)
);