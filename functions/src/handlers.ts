import type { CallableRequest } from "firebase-functions/v2/https";
import db from "./db";

type Handlers = { [P in keyof FirebaseApi]: (req: CallableRequest<FirebaseApi[P]["request"]>) => Promise<FirebaseApi[P]["response"]> };

async function genericUpsert<T extends { id: number }>(row: T, table: string, keys: (string & keyof T)[]) {
    const set = keys.map(x => `${x} = ?`).join(',');
    const setv = keys.map(x => row[x]);
    if (row.id) {
        await db.execute(`UPDATE ${table} SET ${set} WHERE id = ?`, ...setv, row.id);
    } else {
        row.id = (await db.execute(`INSERT INTO ${table} SET ${set}, updated_dth = CURRENT_TIMESTAMP`, ...setv)).insertId;
    }
    return { row: (await db.query<T[]>(`SELECT id,created_dth,updated_dth,${keys.join(',')} FROM ${table} WHERE id = ?`, row.id))[0] };
}
async function genericDelete(ids: unknown, table: string) {
    const array = assertSafeIntegers(ids)
    if (array.length != 0) {
        await db.execute(`DELETE FROM ${table} WHERE id IN (${array.join(',')})`);
    }
    return {}
}

export const handlers: Handlers = {
    UpsertGuardian(req) {
        return genericUpsert(req.data.row as db.Guardian, "guardian", ["name"]);
    },
    UpsertStudent(req) {
        return genericUpsert(req.data.row as db.Student, "student", ["name", "birth_dt", "guardian_id"]);
    },
    UpsertCourse(req) {
        return genericUpsert(req.data.row as db.Course, "course", ["name", "acronym"]);
    },
    UpsertGrade(req) {
        return genericUpsert(req.data.row as db.Grade, "grade", ["name", "acronym", "course_id", "next_grade_id"]);
    },
    UpsertClass(req) {
        return genericUpsert(req.data.row as db.Class, "class", ["letter", "grade_id", "year"]);
    },
    async UpsertClassStudent(req) {
        await db.execute(`
            INSERT INTO class_student (class_id, student_id, updated_dth)
            VALUES (?, ?, CURRENT_TIMESTAMP)
            ON DUPLICATE KEY UPDATE updated_dth = VALUES(updated_dth);
        `, req.data.row.class_id, req.data.row.student_id);
        return { row: (await db.query<db.ClassStudent[]>(`SELECT class_id,student_id,created_dth,updated_dth FROM class_student WHERE class_id = ? AND student_id = ?`, req.data.row.class_id, req.data.row.student_id))[0] };
    },
    DeleteGuardian(req) {
        return genericDelete(req.data.ids, "guardian");
    },
    DeleteStudent(req) {
        return genericDelete(req.data.ids, "student");
    },
    DeleteCourse(req) {
        return genericDelete(req.data.ids, "course");
    },
    DeleteGrade(req) {
        return genericDelete(req.data.ids, "grade");
    },
    DeleteClass(req) {
        return genericDelete(req.data.ids, "class");
    },
    DeleteClassStudent(req) {
        return db.execute(`DELETE FROM class_student WHERE class_id = ? AND student_id = ?`, req.data.class_id, req.data.student_id);
    },
    async ListGuardian(req) {
        return { rows: await db.query<db.Guardian[]>(`SELECT id,created_dth,updated_dth,name FROM guardian ORDER BY id DESC`) };
    },
    async ListStudent(req) {
        return { rows: await db.query<db.Student[]>(`SELECT id,created_dth,updated_dth,name,birth_dt,guardian_id FROM student ORDER BY id DESC`) };
    },
    async ListCourse(req) {
        return { rows: await db.query<db.Course[]>(`SELECT id,created_dth,updated_dth,acronym,name FROM course ORDER BY id DESC`) };
    },
    async ListGrade(req) {
        return { rows: await db.query<db.Grade[]>(`SELECT id,created_dth,updated_dth,name,acronym,next_grade_id,course_id FROM grade ORDER BY id DESC`) };
    },
    async ListClass(req) {
        return { rows: await db.query<db.Class[]>(`SELECT id,created_dth,updated_dth,letter,grade_id,year FROM class ORDER BY id DESC`) };
    },
    async ListClassStudent(req) {
        return { rows: await db.query<db.ClassStudent[]>(`SELECT class_id,student_id,created_dth,updated_dth FROM class_student ORDER BY created_dth DESC`) };
    },
}

function assertSafeIntegers(array: unknown): number[] {
    if (Array.isArray(array) && array.every(Number.isSafeInteger)) {
        return array;
    } else {
        throw new Error("expected array of numbers")
    }
}
