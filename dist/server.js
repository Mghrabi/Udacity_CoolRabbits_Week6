"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var authorization_1 = require("./utilities/authorization");
var students_1 = __importDefault(require("./handlers/students"));
var sessions_1 = __importDefault(require("./handlers/sessions"));
var studentsSession_1 = __importDefault(require("./handlers/studentsSession"));
var app = (0, express_1["default"])();
var address = "0.0.0.0:3000";
app.use(body_parser_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
// createHash('1');
app.use((0, cors_1["default"])());
app.get("/", function (req, res) {
    res.send("Hello World!");
});
(0, students_1["default"])(app);
app.use('/session', authorization_1.authorizationMiddleWare, sessions_1["default"]);
app.use('/user/addtosession', authorization_1.authorizationMiddleWare, studentsSession_1["default"]);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
exports["default"] = app;
