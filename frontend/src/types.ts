export { };
declare global {
    namespace db {
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
}