import { shortenUrl, getUrl, openUrl, deleteUrl } from "../controllers/UrlController.js"
import { Router } from 'express'
import { validateToken } from "../middlewares/ValidateToken.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import { shortenUrlSchema } from "../schemas/ShortenUrlSchema.js";

const UrlRouter = Router();

UrlRouter.post("/urls/shorten",validateToken, validateSchema(shortenUrlSchema), shortenUrl);
UrlRouter.get("/urls/:id", getUrl);
UrlRouter.post("/urls/open/:shortUrl", openUrl);
UrlRouter.delete("/urls/:id", deleteUrl);

export default UrlRouter;
