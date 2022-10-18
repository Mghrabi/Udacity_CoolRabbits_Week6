import express, { Request, Response } from 'express';
import { Student, StudentModel } from '../models/studentModel';

const store = new StudentModel();

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
    res.json(newuser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};


const students_routes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
};

export default students_routes;
