"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
require('dotenv').config();
function ensureAuthenticated(request, response, next) {
    // Receber o token
    var authToken = request.headers.authorization;
    // Validar se o authToken está preenchido
    if (!authToken) {
        return response.status(401).end();
    }
    var _a = authToken.split(' '), token = _a[1];
    try {
        // Validar se token é válido
        var sub = jsonwebtoken_1.verify(token, process.env.TOKEN_SECRET).sub;
        // Recuperar informações do usuário
        request.userId = sub;
        return next();
    }
    catch (error) {
        return response.status(401).end();
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
