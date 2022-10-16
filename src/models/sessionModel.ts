import client from "../db/db";

export type Session = {
  id?: number;
  title: string;
  date: Date;
};

export class SessionModel {
  async index(): Promise<Session[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM sessions;";
      const result = await connnection.query(sql);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log(err);
      throw new Error(`err in fetching all sessions, err: ${err as string}`);
    }
  }

  async show(id: string): Promise<Session | void> {
    try {
      const connnection = await client.connect();
      const sql = "SELECT * FROM sessions WHERE id=$1;";
      const result = await connnection.query(sql, [id]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(
        `err in fetching session with id ${id}, err: ${err as string}`
      );
    }
  }

  async create(session: Session): Promise<Session | void> {
    try {
      const connnection = await client.connect();
      const sql =
        "INSERT INTO sessions(title, date) VALUES ($1, $2) RETURNING *;";
      const result = await connnection.query(sql, [
        session.title,
        session.date,
      ]);
      connnection.release();
      return result.rows[0];
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating session, err: ${err as string}`);
    }
  }

  // [Extra] dangerous (ON DELETE CASCADE)
  async delete(sessionId: string): Promise<Session[] | void> {
    try {
      const connnection = await client.connect();
      const sql = "DELETE FROM sessions where id=$1;";
      const result = await connnection.query(sql, [sessionId]);
      connnection.release();
      return result.rows;
    } catch (err: unknown) {
      console.log("err");
      throw new Error(`err in creating session, err: ${err as string}`);
    }
  }

}
