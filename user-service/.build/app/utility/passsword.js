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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = exports.GetToken = exports.ValidatePassword = exports.GetHashedPassword = exports.GetSalt = void 0;
//! LIBRARY
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const APP_SECRET = "our_app_secret";
const GetSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt();
});
exports.GetSalt = GetSalt;
const GetHashedPassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.GetHashedPassword = GetHashedPassword;
const ValidatePassword = (enteredPassword, savedPassword, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return (yield (0, exports.GetHashedPassword)(enteredPassword, salt)) == savedPassword;
});
exports.ValidatePassword = ValidatePassword;
const GetToken = ({ user_id, email, phone, userType }) => {
    return jsonwebtoken_1.default.sign({
        user_id,
        email,
        phone,
        userType,
    }, APP_SECRET, {
        expiresIn: "30d",
    });
};
exports.GetToken = GetToken;
const VerifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (token !== "") {
            const payload = yield jsonwebtoken_1.default.verify(token.split(" ")[1], APP_SECRET);
            return payload;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
exports.VerifyToken = VerifyToken;
//# sourceMappingURL=passsword.js.map