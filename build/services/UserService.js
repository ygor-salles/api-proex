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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
var typeorm_1 = require("typeorm");
var UserRepository_1 = require("../repositories/UserRepository");
var http_status_1 = __importDefault(require("http-status"));
var bcryptjs_1 = require("bcryptjs");
var UserService = /** @class */ (function () {
    function UserService() {
        this.connectUser = typeorm_1.getCustomRepository(UserRepository_1.UserRepository);
    }
    UserService.prototype.create = function (name, email, password, role) {
        return __awaiter(this, void 0, void 0, function () {
            var userExist, passwordHash, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.connectUser.findOne({ email: email })];
                    case 1:
                        userExist = _a.sent();
                        if (userExist) {
                            return [2 /*return*/, { status: http_status_1.default.BAD_REQUEST, message: 'Usuário já existe' }];
                        }
                        return [4 /*yield*/, bcryptjs_1.hash(password, 8)];
                    case 2:
                        passwordHash = _a.sent();
                        user = this.connectUser.create({
                            name: name,
                            email: email,
                            password: passwordHash,
                            role: role
                        });
                        return [4 /*yield*/, this.connectUser.save(user)];
                    case 3:
                        _a.sent();
                        delete user.password;
                        return [2 /*return*/, { status: http_status_1.default.CREATED, obj: user }];
                    case 4:
                        error_1 = _a.sent();
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.ready = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.connectUser.find({
                                select: ['id', 'name', 'email', 'role', 'created_at']
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.readyById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.connectUser.findOne({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            delete user.password;
                            return [2 /*return*/, { status: http_status_1.default.OK, obj: user }];
                        }
                        return [2 /*return*/, { status: http_status_1.default.NOT_FOUND, message: 'Usuário não existe!' }];
                    case 2:
                        error_3 = _a.sent();
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.connectUser.findOne({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.connectUser.delete(user.id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { status: http_status_1.default.OK, message: 'Usuário removido com sucesso!' }];
                    case 3: return [2 /*return*/, { status: http_status_1.default.NOT_FOUND, message: 'Usuário não existe!' }];
                    case 4:
                        error_4 = _a.sent();
                        throw error_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.update = function (id, name, email, password, role) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordHash, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.connectUser.findOne({ id: id })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, bcryptjs_1.hash(password, 8)];
                    case 2:
                        passwordHash = _a.sent();
                        return [4 /*yield*/, this.connectUser.update(user.id, { name: name, email: email, password: passwordHash, role: role })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { status: http_status_1.default.OK, message: 'Usuário atualizado com sucesso!' }];
                    case 4: return [2 /*return*/, { status: http_status_1.default.NOT_FOUND, message: 'Usuário não existe!' }];
                    case 5:
                        error_5 = _a.sent();
                        throw error_5;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
