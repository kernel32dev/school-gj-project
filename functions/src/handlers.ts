import type { CallableRequest } from "firebase-functions/v2/https";
import db from "./db";

type Handlers = { [P in keyof FirebaseApi]: (req: CallableRequest<FirebaseApi[P]["request"]>) => Promise<FirebaseApi[P]["response"]> };

export const handlers: Handlers = {
    async ListGuardian(req) {
        return { rows: await db.query(`SELECT id,created_dth,name FROM guardian ORDER BY id DESC`) as db.Guardian[] };
    },
    async ListStudent(req) {
        return { rows: await db.query(`SELECT id,created_dth,name,birth_dt,guardian_id FROM student ORDER BY id DESC`) as db.Student[] };
    },
    async ListCourse(req) {
        return { rows: await db.query(`SELECT id,created_dth,acronym,name FROM course ORDER BY id DESC`) as db.Course[] };
    },
    async ListGrade(req) {
        return { rows: await db.query(`SELECT id,created_dth,name,acronym,next_grade_id,course_id FROM grade ORDER BY id DESC`) as db.Grade[] };
    },
    async ListClass(req) {
        return { rows: await db.query(`SELECT id,created_dth,letter,grade_id,year FROM class ORDER BY id DESC`) as db.Class[] };
    },
    async ListClassStudent(req) {
        return { rows: await db.query(`SELECT class_id,student_id,created_dth FROM class_student ORDER BY id DESC`) as db.ClassStudent[] };
    },
};
