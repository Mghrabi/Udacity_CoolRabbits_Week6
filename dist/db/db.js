"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// console.log('process.env',process.env)
const { DB_USERNAME, HOST, DATABASE, PASSWORD } = process.env;
let usedDatabase = DATABASE;
// let usedDatabase = DATABASE_TEST;
const client = new pg_1.Pool({
    user: DB_USERNAME,
    host: HOST,
    database: usedDatabase,
    password: PASSWORD,
    port: 5432,
});
exports.default = client;
