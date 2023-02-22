import { shortenUrl, getUrl, openUrl, deleteUrl } from "../controllers/UrlController.js"
import { Router } from 'express'


const UrlRouter = Router();

UrlRouter.post("/urls/shorten", shortenUrl);
UrlRouter.get("/urls/:id", getUrl);
UrlRouter.post("/urls/open/:shortUrl", openUrl);
UrlRouter.delete("/urls/:id", deleteUrl);

export default UrlRouter;
