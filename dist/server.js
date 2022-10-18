"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const students_1 = __importDefault(require("./handlers/students"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
const dotenv_1 = __importDefault(require("dotenv"));
// import productRouter from "./handlers/productHandler";
// import OrderRouter from "./handlers/orderHandler";
dotenv_1.default.config();
// createHash('1');
app.use((0, cors_1.default)());
(0, students_1.default)(app);
// productRouter(app);
// OrderRouter(app);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
exports.default = app;
