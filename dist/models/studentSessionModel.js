"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSessionModel = void 0;
const db_1 = __importDefault(require("../db/db"));
class StudentSessionModel {
    async create({ studentId, sessionId, }) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "INSERT INTO students_sessions (studentId, sessionId) VALUES ($1, $2) RETURNING *;";
            const result = await connnection.query(sql, [studentId, sessionId]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in adding relation, err: ${err}`);
        }
    }
}
exports.StudentSessionModel = StudentSessionModel;
