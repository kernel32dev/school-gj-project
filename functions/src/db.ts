import * as mysql from "mysql2";
import * as logger from "firebase-functions/logger";
import { development } from "./environment";

const mysql_config: mysql.PoolOptions = development
    ? {
        // DEVELOPMENT
        connectionLimit: 1,
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '12345678',
        database: 'school_gj',
    } : {
        // PRODUCTION
        connectionLimit: 1,
        socketPath: '/cloudsql/school-gj-project:southamerica-east1:school-gj-db',
        user: 'funcuser',
        password: '3f691975a92e124d617bc29',
        database: 'school_gj',
    };

const pool = mysql.createPool(mysql_config);

export default {
    query<T = any>(
        sql: string | mysql.QueryOptions,
        ...values: any[]
    ): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            pool.query(sql as any, values, (error, data) => {
                if (error) {
                    logger.error({sql, error});
                    reject(error);
                    return;
                }
                convertDates(data);
                resolve(data as T);
            });
        });
    },
    execute<T = mysql.ResultSetHeader>(
        sql: string | mysql.QueryOptions,
        ...values: any[]
    ): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            pool.execute(sql as any, values, (error, data) => {
                if (error) {
                    logger.error({sql, error});
                    reject(error);
                    return;
                }
                convertDates(data);
                resolve(data as T);
            });
        });
    },
};

function convertDates(data: any) {
    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            const keys = Object.keys(data[i]);
            for (let j = 0; j < data.length; j++) {
                if (data[i][keys[j]] instanceof Date) {
                    data[i][keys[j]] = data[i][keys[j]].toISOString();
                }
            }
        }
    }
}
