import { Request, Response, Router } from 'express';
import { StudentSessionModel, StudentsSessionsType } from '../models/studentSessionModel';
import { config } from 'dotenv';
config();
const model = new StudentSessionModel();
const create = async (req: Request, res: Response) => {
    try {
        const studentInSeesoin = await model.create(req.body);
        res.status(201).json(studentInSeesoin);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
}
const router = Router();
router
    .route('/')
    .post(create);
export default router;