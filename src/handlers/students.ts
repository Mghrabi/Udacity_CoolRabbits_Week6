import express, { Request, Response } from 'express';
import { Student, StudentModel } from '../models/studentModel';
import { authorizationMiddleWare } from '../utilities/authorization';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const store = new StudentModel();

dotenv.config();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.body.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: Student = {
      email: req.body.email,
      name: req.body.name,
      hash: req.body.hash
    };

    const newuser = await store.create(user);
    
    const token = jwt.sign(
      newuser as Student,
      process.env.TOKEN_SECRET  as string
    );

    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const authenticate = async (req: Request, res: Response) => {
  try {
    const user = (await store.authenticate(req.body.email, req.body.hash)) as Student;
    const token = jwt.sign(
      user as Student,
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error: 'wrong password or username' });
  }
};

const students_routes = (app: express.Application) => {
  app.get('/users', authorizationMiddleWare, index);
  app.get('/get_user/:id',authorizationMiddleWare, show);
  app.post('/add_users', create);
  app.post('/authenticate', authenticate);
};

export default students_routes;
