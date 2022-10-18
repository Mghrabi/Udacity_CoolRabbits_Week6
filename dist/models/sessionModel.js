"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModel = void 0;
const db_1 = __importDefault(require("../db/db"));
class SessionModel {
    async index() {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT * FROM sessions;";
            const result = await connnection.query(sql);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`err in fetching all sessions, err: ${err}`);
        }
    }
    async show(id) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT * FROM sessions WHERE id=$1;";
            const result = await connnection.query(sql, [id]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching session with id ${id}, err: ${err}`);
        }
    }
    async create(session) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "INSERT INTO sessions(title, date) VALUES ($1, $2) RETURNING *;";
            const result = await connnection.query(sql, [
                session.title,
                session.date,
            ]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in creating session, err: ${err}`);
        }
    }
    // [Extra] dangerous (ON DELETE CASCADE)
    async delete(sessionId) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "DELETE FROM sessions where id=$1;";
            const result = await connnection.query(sql, [sessionId]);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in creating session, err: ${err}`);
        }
    }
}
exports.SessionModel = SessionModel;
