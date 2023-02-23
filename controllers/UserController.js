import { db } from "../configs/database.connection.js";
import bcrypt from "bcrypt";

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

export async function signIn(req, res) {}

export async function myUser(req, res) {}
