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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
//! MODELS
const databaseClient_1 = require("../utility/databaseClient");
class UserRepository {
    constructor() { }
    // Create account
    createAccount({ phone, email, password, salt, userType }) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, databaseClient_1.DBClient)();
            yield client.connect();
            const queryString = "INSERT INTO users(phone,email,password,salt,user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";
            const values = [phone, email, password, salt, userType];
            const result = yield client.query(queryString, values);
            yield client.end();
            if (result.rowCount > 0) {
                return result.rows[0];
            }
        });
    }
    // Find Account
    findAccount(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield (0, databaseClient_1.DBClient)();
            yield client.connect();
            const queryString = "SELECT user_id, email, password, phone, salt FROM users WHERE email = $1";
            const values = [email];
            const result = yield client.query(queryString, values);
            yield client.end();
            if (result.rowCount < 1) {
                throw new Error("user does not exist with provided email id!");
            }
            return result.rows[0];
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map