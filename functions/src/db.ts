import * as mysql from "mysql2";
export default mysql.createPool({
    connectionLimit: 1,
    socketPath: '/cloudsql/school-gj-project:southamerica-east1:school-gj-db',
    user: 'funcuser',
    password: '3f691975a92e124d617bc29',
    database: 'school_gj'
});
