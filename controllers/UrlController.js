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
		const returning = shorten.rows[0];

		return res
			.status(201)
			.json({ id: returning.id, shortUrl: returning.short_url });
	} catch (err) {
		return res.status(500).send(err);
	}
}

export async function getUrl(req, res) {
	const { id } = req.params;

	try {
		const chosenUrl = await db.query(
			`SELECT * FROM urls WHERE "id" = $1`,
			[id]
		);

		if (chosenUrl.rowCount === 0) {
			return res.status(404).send("No url with this id");
		}

		const returning = chosenUrl.rows[0];

		return res.status(200).json({
			id: returning.id,
			shortUrl: returning.short_url,
			url: returning.url,
		});
	} catch (err) {
		return res.status(500).send(err);
	}
}

export async function openUrl(req, res) {
	const { shortUrl } = req.params;
	try {
		const chosenUrl = await db.query(
			`SELECT * FROM urls WHERE "short_url" = $1`,
			[shortUrl]
		);
		if (chosenUrl.rowCount === 0) {
			return res.status(404).send("Url not found");
		}

		const updatedVisitCount = chosenUrl.rows[0].visit_count + 1;

		await db.query(
			`UPDATE urls SET visit_count = $1 WHERE "short_url" = $2`,
			[updatedVisitCount, shortUrl]
		);

		return res.redirect(chosenUrl.rows[0].url);
	} catch (err) {
		return res.status(500).send(err);
	}
}

export async function deleteUrl(req, res) {
    const { id } = req.params;
	const currentSession = res.locals.session;
    const user = currentSession.rows[0].user_id;

    try{
    
    const chosenUrl = await db.query(
        `SELECT * FROM urls WHERE "id" =$1`,
        [id]
    );
		console.log(chosenUrl.rows[0])

		if (chosenUrl.rowCount == 0) return res.status(404).send("Id does not exist");

        if (chosenUrl.rows[0].user_id !== user) return res.status(401).send("Id does not belong to this user");

		await db.query (`DELETE FROM urls WHERE id =$1`,[id])
        return res.status(204).send("Ok")

    }catch(err){
        return res.status(500).send(err);
    }      
}

export async function myUser(req, res) {
	const currentSession = res.locals.session;
	const user = currentSession.rows[0].user_id;

	try {
		const userShortens = await db.query(
			`
		SELECT 
		id,
		short_url AS "shortUrl",
		url,
		visit_count as "visitCount"
		FROM urls WHERE user_id =$1`,
			[user]
		);

		const userStats = await db.query(
			`
			SELECT id, name,
			(SELECT SUM(visit_count) FROM urls WHERE user_id = $1) as visitCount
			FROM users
			WHERE id = $1
			`,
			[user]
		);

		const FinalObject = {
			id: userStats.rows[0].id,
			name: userStats.rows[0].name,
			visitCount: userStats.rows[0].visitcount !== null ? userStats.rows[0].visitcount : 0,
			shortenedUrls: userShortens.rows,
		};

		return res.status(200).send(FinalObject);
	} catch (err) {
		return res.status(500).send(err);
	}
}

