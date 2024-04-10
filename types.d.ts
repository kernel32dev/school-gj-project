// this file stores types used by both frontend and functions
declare namespace db {
    export interface Table {
        id: number;
        created_dth: string;
        updated_dth: string;
    }
    export interface Guardian extends Table {
        name: string;
    }
    export interface Student extends Table {
        name: string;
        birth_dt: string;
        guardian_id: number;
    }
    export interface Course extends Table {
        name: string;
        acronym: string;
    }
    export interface Grade extends Table {
        name: string;
        acronym: string;
        course_id: number;
        next_grade_id: number | null;
    }
    export interface Class extends Table {
        letter: string;
        grade_id: number;
        year: number;
    }
    export interface ClassStudent {
        class_id: number;
        student_id: number;
        created_dth: string;
        updated_dth: string;
    }
}
declare type FirebaseApi = { [P in keyof UntaggedFirebaseApi]: UntaggedFirebaseApi[P] & { request: { name: P } } }
interface UntaggedFirebaseApi {
    ListGuardian: {
        request: {},
        response: { rows: db.Guardian[] },
    };
    ListStudent: {
        request: {},
        response: { rows: db.Student[] },
    };
    ListCourse: {
        request: {},
        response: { rows: db.Course[] },
    };
    ListGrade: {
        request: {},
        response: { rows: db.Grade[] },
    };
    ListClass: {
        request: {},
        response: { rows: db.Class[] },
    };
    ListClassStudent: {
        request: {},
        response: { rows: db.ClassStudent[] },
    };
}