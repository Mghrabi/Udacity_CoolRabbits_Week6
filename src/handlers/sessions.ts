import express, { Request, Response, Router } from 'express';
import { Session, SessionModel } from '../models/sessionModel';
import { config } from 'dotenv';
const model = new SessionModel();
config();
const index = async (_req: Request, res: Response) => {
    const sessions = await model.index();
    res.json(sessions);
}
const show = async (req: Request, res: Response) => {
    const session = await model.show(req.params.id);
    res.json(session);
}
const create = async (req: Request, res: Response) => {
    try {
        //check that date sent by the user is valid one, if not vaild Date.parse() return NaN
        // date must be m/d/y
        if(Number.isNaN(Date.parse(req.body.date))) {
            throw new Error('invaild date');
        }
        const session = await model.create(req.body);
        res.json(session);
    } catch(e) {
        console.log(e);
        res.status(400).end();
    }
}
const remove = async (req: Request, res: Response) => {
    try {
        await model.delete(req.params.id);
        res.end();
    } catch(e) {
        console.log(e);
        res.status(400).end();
    }
}

const router  = Router();
router
    .route('/')
    .get(index)
    .post(create);
router
    .route('/:id')
    .get(show)
    .delete(remove);
export default router;