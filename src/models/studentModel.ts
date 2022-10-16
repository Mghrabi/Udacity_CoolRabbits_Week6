import client from "../db/db";

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
      const result = await connnection.query(sql, [
        student.email,
        student.name,
        student.hash,
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
}
