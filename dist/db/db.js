"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
// console.log('process.env',process.env)
var _a = process.env, DB_USERNAME = _a.DB_USERNAME, HOST = _a.HOST, DATABASE = _a.DATABASE, PASSWORD = _a.PASSWORD;
var usedDatabase = DATABASE;
// let usedDatabase = DATABASE_TEST;
var client = new pg_1.Pool({
    user: DB_USERNAME,
    host: HOST,
    database: usedDatabase,
    password: PASSWORD,
    port: 5432
});
exports["default"] = client;
