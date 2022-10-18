"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const studentModel_1 = require("../models/studentModel");
const store = new studentModel_1.StudentModel();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.body.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            name: req.body.name,
            hash: req.body.hash
        };
        const newuser = await store.create(user);
        res.json(newuser);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const students_routes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};
exports.default = students_routes;
