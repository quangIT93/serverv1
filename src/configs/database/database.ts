import mariadb, { PoolConnection } from "mariadb";
import dotenv from "dotenv";
import logging from "../../utils/logging";

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: +process.env.DB_PORT,
    connectionLimit: 10,
    allowPublicKeyRetrieval: true,
});

let conn: PoolConnection;

export const connectDatabase = async () => {
    try {
        if (!conn) {
            conn = await pool.getConnection();
            logging.success("Get connection to database success");
        }
        return conn;
    } catch (error) {
        logging.error("Get connection to database failure");
    }
};

export const executeQuery = async (query: string, params = []) => {
    try {
        const conn = await connectDatabase();
        const res = await conn.query(query, params);
        return res;
    } catch (error) {
        switch (error.code) {
            case "PROTOCOL_CONNECTION_LOST":
                logging.info("Try to reconnect to database");
                try {
                    conn = null;
                    conn = await connectDatabase();
                    logging.success("Reconnect to database success");
                    const res = await conn.query(query, params);
                    return res;
                } catch (error) {
                    logging.error(`Error: ${error.message}`);
                    return null;
                }
            case "ER_CMD_CONNECTION_CLOSED":
                logging.info("Try to reconnect to database");
                try {
                    conn = null;
                    conn = await connectDatabase();
                    logging.success("Reconnect to database success");
                    const res = await conn.query(query, params);
                    return res;
                } catch (error) {
                    logging.error(`Error: ${error.message}`);
                    return null;
                }
            case "ER_DUP_ENTRY":
                // logging.error(`Error: ${error.message}`);
                console.log(error.code);
                return error.code;   
            case "ER_NO_REFERENCED_ROW_2":
                logging.error(`Error: ${error.message}`);
                console.log(error.code);
                return error.code;
            default:
                logging.error(error.code);
                logging.error(`Error: ${error.message}`)
                // console.log(error.message);
                return null;
        }
    } finally {
        conn.release();
    }
};
