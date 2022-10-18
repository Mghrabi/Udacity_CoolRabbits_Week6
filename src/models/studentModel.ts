import client from "../db/db";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD;
const salt_rounds = process.env.SALT_ROUNDS;

export type Student = {
  id?: number;
  email: string;
  name: string;
  hash?: string;
};

export class StudentModel {
  async create(student: Student): Promise<Student | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO students(email, name, hash) VALUES ($1, $2, $3) RETURNING id, email, name;";

      const hash: string = bcrypt.hashSync(
        student.hash as string + pepper,
        parseInt(salt_rounds as string)
      );
      
      const result = await connnection.query(sql, [
        student.email,
        student.name,
        hash,
      ]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating student, err: ${err as string}`);
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

  async index(): Promise<Student[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT id, email, name FROM students;";
      const result = await connnection.query(sql);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log(err);
      throw new Error(`err in fetching all students, err: ${err as string}`);
    }
  }

  async show(studentId: string): Promise<Student | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM students WHERE id=$1;";
      const result = await connnection.query(sql, [studentId]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching student with studentId ${studentId}, err: ${err as string}`
      );
    }
  }

  async authenticate(email: string, password: string): Promise<Student | string> {
    try {
      const sql = 'SELECT * FROM students WHERE email=$1';
      const connection = await client.connect();

      const res = await connection.query(sql, [email]);
      connection.release();

      if (res.rows.length) {
        if (bcrypt.compareSync(password + pepper, res.rows[0].password)) {
          return res.rows[0];
        }
      }
      return 'wrong password or email';
    } catch (error) {
      throw new Error(`can\'t this.authenticate the user, Error: ${(error as Error).message}`);
    }
  }
}
