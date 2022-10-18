"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const db_1 = __importDefault(require("../db/db"));
class StudentModel {
    async create(student) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "INSERT INTO students(email, name, hash) VALUES ($1, $2, $3) RETURNING id, email, name;";
            const result = await connnection.query(sql, [
                student.email,
                student.name,
                student.hash,
            ]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in creating student, err: ${err}`);
        }
    }
    // async delete(studentId: string): Promise<Student[] | void> {
    //   try {
    //     const connnection = await client.connect();
    //     const sql = "DELETE FROM students where id=$1;";
    //     const result = await connnection.query(sql, [studentId]);
    //     connnection.release();
    //     console.log("student delete result rows", result.rows.length);
    //     return result.rows;
    //   } catch (err: unknown) {
    //     console.log("err");
    //     throw new Error(`err in creating student, err: ${err as string}`);
    //   }
    // }
    async index() {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT id, email, name FROM students;";
            const result = await connnection.query(sql);
            connnection.release();
            return result.rows;
        }
        catch (err) {
            console.log(err);
            throw new Error(`err in fetching all students, err: ${err}`);
        }
    }
    async show(studentId) {
        try {
            const connnection = await db_1.default.connect();
            const sql = "SELECT * FROM students WHERE id=$1;";
            const result = await connnection.query(sql, [studentId]);
            connnection.release();
            return result.rows[0];
        }
        catch (err) {
            console.log("err");
            throw new Error(`err in fetching student with studentId ${studentId}, err: ${err}`);
        }
    }
}
exports.StudentModel = StudentModel;
