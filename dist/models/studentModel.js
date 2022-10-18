"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.StudentModel = void 0;
var db_1 = __importDefault(require("../db/db"));
var dotenv_1 = __importDefault(require("dotenv"));
var bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1["default"].config();
var pepper = process.env.BCRYPT_PASSWORD;
var salt_rounds = process.env.SALT_ROUNDS;
var StudentModel = /** @class */ (function () {
    function StudentModel() {
    }
    StudentModel.prototype.create = function (student) {
        return __awaiter(this, void 0, void 0, function () {
            var connnection, sql, hash, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connnection = _a.sent();
                        sql = "INSERT INTO students(email, name, hash) VALUES ($1, $2, $3) RETURNING id, email, name;";
                        hash = bcrypt_1["default"].hashSync(student.hash + pepper, parseInt(salt_rounds));
                        return [4 /*yield*/, connnection.query(sql, [
                                student.email,
                                student.name,
                                hash,
                            ])];
                    case 2:
                        result = _a.sent();
                        connnection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_1 = _a.sent();
                        console.log("err");
                        throw new Error("err in creating student, err: ".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // async delete(studentId: string): Promise<Student[] | void> {
    //   try {
    //     const connnection = await client.connect();
    //     const sql = "DELETE FROM students where id=$1;";
    //     const result = await connnection.query(sql, [studentId]);
    //     connnection.release();
    //     console.log("student delete result rows", result.rows.length);
    //     return result.rows;
    //   } catch (err: unknown) {
    //     console.log("err");
    //     throw new Error(`err in creating student, err: ${err as string}`);
    //   }
    // }
    StudentModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var connnection, sql, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connnection = _a.sent();
                        sql = "SELECT id, email, name FROM students;";
                        return [4 /*yield*/, connnection.query(sql)];
                    case 2:
                        result = _a.sent();
                        connnection.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        throw new Error("err in fetching all students, err: ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StudentModel.prototype.show = function (studentId) {
        return __awaiter(this, void 0, void 0, function () {
            var connnection, sql, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connnection = _a.sent();
                        sql = "SELECT * FROM students WHERE id=$1;";
                        return [4 /*yield*/, connnection.query(sql, [studentId])];
                    case 2:
                        result = _a.sent();
                        connnection.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_3 = _a.sent();
                        console.log("err");
                        throw new Error("err in fetching student with studentId ".concat(studentId, ", err: ").concat(err_3));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StudentModel.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM students WHERE email=$1';
                        return [4 /*yield*/, db_1["default"].connect()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.query(sql, [email])];
                    case 2:
                        res = _a.sent();
                        connection.release();
                        if (res.rows.length) {
                            if (bcrypt_1["default"].compareSync(password + pepper, res.rows[0].password)) {
                                return [2 /*return*/, res.rows[0]];
                            }
                        }
                        return [2 /*return*/, 'wrong password or email'];
                    case 3:
                        error_1 = _a.sent();
                        throw new Error("can't this.authenticate the user, Error: ".concat(error_1.message));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return StudentModel;
}());
exports.StudentModel = StudentModel;
