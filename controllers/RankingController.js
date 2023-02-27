import { db } from "../configs/database.connection.js";

export async function ranking(req, res) {

    try{
        const data = await db.query(
            `
            SELECT users.id, users.name, COUNT(url) AS "linksCount", SUM(visit_count) AS "visitCount"
            FROM users
            JOIN urls ON users.id = urls.user_id
            GROUP BY users.id, users.name
            ORDER BY "visitCount" DESC
            LIMIT 10
            `
        );

        res.status(200).send(data.rows)

    } catch (error) {
        return res.status(500).send(error);
    }
}
