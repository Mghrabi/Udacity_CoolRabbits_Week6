import client from "../db/db";

//the requirements.md file asked for a model/table so I created a model for the joined table
export type StudentsSessionsType = {
  id?: number;
  studentId: number;
  sessionId: number;
};

export class StudentSessionModel {
  async create({
    studentId,
    sessionId,
  }: StudentsSessionsType): Promise<StudentsSessionsType | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO students_sessions (studentId, sessionId) VALUES ($1, $2) RETURNING *;";
      const result = await connnection.query(sql, [studentId, sessionId]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in adding relation, err: ${err as string}`);
    }
  }
}
