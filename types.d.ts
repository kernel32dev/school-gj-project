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
declare type FirebaseApi = { [P in keyof UntaggedFirebaseApi]: UntaggedFirebaseApi[P] & { request: { api: P } } }
type UpsertInput<T> = Omit<T, "created_dth" | "updated_dth">;
interface UntaggedFirebaseApi {
    UpsertGuardian: {
        request: { row: UpsertInput<db.Guardian> },
        response: { row: db.Guardian },
    };
    UpsertStudent: {
        request: { row: UpsertInput<db.Student> },
        response: { row: db.Student },
    };
    UpsertCourse: {
        request:{ row: UpsertInput<db.Course> } ,
        response:{ row: db.Course } ,
    };
    UpsertGrade: {
        request: { row: UpsertInput<db.Grade> },
        response: { row: db.Grade },
    };
    UpsertClass: {
        request: { row: UpsertInput<db.Class> },
        response: { row: db.Class },
    };
    UpsertClassStudent: {
        request: { row: UpsertInput<db.ClassStudent> },
        response: { row: db.ClassStudent },
    };
    DeleteGuardian: {
        request: { ids: number[] },
        response: {},
    };
    DeleteStudent: {
        request: { ids: number[] },
        response: {},
    };
    DeleteCourse: {
        request:{ ids: number[]} ,
        response:{} ,
    };
    DeleteGrade: {
        request: { ids: number[] },
        response: {},
    };
    DeleteClass: {
        request: { ids: number[] },
        response: {},
    };
    DeleteClassStudent: {
        request: { class_id: number, student_id: number },
        response: {},
    };
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