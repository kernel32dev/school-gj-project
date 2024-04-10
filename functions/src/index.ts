import { onRequest } from "firebase-functions/v2/https";
import db from "./db";
import { setGlobalOptions } from "firebase-functions/v2/options";

setGlobalOptions({
    region: "southamerica-east1"
});

export const listGuardian = onRequest(async (req, res) => {
    res.send({data: await db.query(res, `SELECT id,created_dth,name FROM guardian ORDER BY id DESC`)})
})
export const listStudent = onRequest(async (req, res) => {
    res.send({data: await db.query(res, `SELECT id,created_dth,name,birth_dt,guardian_id FROM student ORDER BY id DESC`)})
})
export const listCourse = onRequest(async (req, res) => {
    res.send({data: await db.query(res, `SELECT id,created_dth,acronym,name FROM course ORDER BY id DESC`)})
})
export const listGrade = onRequest(async (req, res) => {
    res.send({data: await db.query(res, `SELECT id,created_dth,name,acronym,next_grade_id,course_id FROM grade ORDER BY id DESC`)})
})
export const listClass = onRequest(async (req, res) => {
    res.send({data: await db.query(res, `SELECT id,created_dth,letter,grade_id,year FROM class ORDER BY id DESC`)})
})
export const listClassStudent = onRequest(async (req, res) => {
    res.send({data: await db.query(res, `SELECT class_id,student_id,created_dth FROM class_student ORDER BY id DESC`)})
})

