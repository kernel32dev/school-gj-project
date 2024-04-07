/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

import { onRequest } from "firebase-functions/v2/https";
import db from "./db";
//import * as logger from "firebase-functions/logger";

export const helloWorld = onRequest((req, res) => {
    db.query(`SELECT id, name, value FROM tb_test`, (e, results) => {
        if (e) {
            res.status(500).send(e);
            return;
        }
        res.send(results);
    });
});
