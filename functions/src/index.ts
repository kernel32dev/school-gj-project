import { onRequest } from "firebase-functions/v2/https";
import db from "./db";

export const helloWorld = onRequest(async (req, res) => {
    const data = await db.query(res, `SELECT id, name, value FROM tb_test`);
    res.send({ data });
});
