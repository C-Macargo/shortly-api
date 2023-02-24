import { db } from "../configs/database.connection.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function signUp(req, res) {
	const { email, name, password, confirmPassword } = req.body;
	const hashedPassword = bcrypt.hashSync(password, 10);

	try {
		const emailExists = await db.query(
			`SELECT * FROM users WHERE "email" = $1`,
			[email]
		);
		if (emailExists.rows.length > 0) {
			return res.status(409).send("email already in use!");
		}

		const user = await db.query(
			`
        	INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *
        `,
			[name, email, hashedPassword]
		);
		return res.status(201).send("user added successfully");
	} catch (err) {
		console.log(err);
		return res.status(500).send(err.message);
	}
}

export async function signIn(req, res) {
	const { email, password } = req.body;
	const token = uuidv4();

	try {
		const userExists = await db.query(
			`SELECT * FROM users WHERE "email" = $1`,
			[email]
		);
		if (userExists.rows.length === 0) {
			return res.status(401).send("email or password are incorrect");
		}

		const isCorrectPassword = bcrypt.compareSync(
			password,
			userExists.rows[0].password
		);
		if (!isCorrectPassword) {
			return res.status(401).send("email or password are incorrect");
		}

		const userId = userExists.rows[0].id;

		const checkSession = await db.query(
			`SELECT * FROM sessions WHERE "user_id" = $1`,
			[userId]
		);

		if (checkSession.rows.length === 0) {
			const insertSession = await db.query(
				`INSERT INTO sessions (token, user_id) VALUES ($1, $2) RETURNING *`,
				[token, userId]
			);
			return res.status(200).send(insertSession.rows[0].token);
		} else {
			return res.status(200).send(checkSession.rows[0].token);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
}

