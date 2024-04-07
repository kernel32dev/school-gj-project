import * as mysql from "mysql2";
export default mysql.createPool({
    connectionLimit: 1,
    //socketPath: '/cloudsql/school-gj-project:southamerica-east1:school-gj-db',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '12345678',
    database: 'school_gj'
});
