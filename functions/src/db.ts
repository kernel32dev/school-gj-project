import * as mysql from "mysql2";
import type { Response as ExpressResponse } from "express";
import * as logger from "firebase-functions/logger";

const development = process.env["NODE_ENV"] !== "production";

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
    /** executes the query, and returns the data in the promise
     *
     * if the query fails, the errors is logged and sent through the response and the promise never resolves */
    query<T extends mysql.QueryResult>(
        res: ExpressResponse,
        sql: string | mysql.QueryOptions,
        values?: any[],
    ): Promise<T> {
        return new Promise<T>((resolve) => {
            pool.query<T>(sql as any, values, (error, data) => {
                if (error) {
                    logger.error({sql, error});
                    if (development) {
                        res.status(500).send({error});
                    } else {
                        res.status(500);
                    }
                    return;
                }
                resolve(data);
            });
        });
    }
};
