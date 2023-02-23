import { db } from "../configs/database.connection.js";
import { customAlphabet } from "nanoid";

export async function shortenUrl(req, res) {
	const { url } = req.body;
	const currentSession = res.locals.session;
	const user = currentSession.rows[0].user_id;

	const nanoid = customAlphabet("1234567890abcdef", 8);
	const shortenedUrl = nanoid();

	try {
		const shorten = await db.query(
			`
        	INSERT INTO urls (user_id , url, short_url) VALUES ($1, $2, $3) RETURNING *
        `,
			[user, url, shortenedUrl]
		);
        const returning = shorten.rows[0]

        const id = returning.id
        const shortUrl = returning.short_url

		return res.status(201).json({id,shortUrl});
	} catch (err) {
		return res.status(500).send(err);
	}
}

export async function getUrl(req, res) {}

export async function openUrl(req, res) {}

export async function deleteUrl(req, res) {}
