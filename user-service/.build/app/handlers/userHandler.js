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
exports.Payment = exports.Cart = exports.Profile = exports.Verify = exports.Login = exports.Signup = void 0;
const core_1 = __importDefault(require("@middy/core"));
const http_json_body_parser_1 = __importDefault(require("@middy/http-json-body-parser"));
const tsyringe_1 = require("tsyringe");
// //! SERVICE
const userService_1 = require("../service/userService");
// //! UTILS
const response_1 = require("../utility/response");
const service = tsyringe_1.container.resolve(userService_1.UserService);
/**
* @author Nguyễn Tiến Tài
* @created_at 01/06/2023
* @param {String} phone - Phone
* @param {String} email - Email
* @param {String} password - Password admin
* @param {Object} res - response
* @returns {Object} data - return data {}
* @returns {String} data.user_id  - return 1
* @returns {Number} data.email - return nguyentientai10@gmail.com
* @returns {String} data.password - return $2b$10$J9wzRkXaXiUDwyHIlPMbFOlRgOFLQzus1HyLOHqPy.KuSyyv/hKyW
* @returns {String} data.salt - return $2b$10$J9wzRkXaXiUDwyHIlPMbFO
* @returns {String} data.user_type - return BUYER
* @returns {String} data.created_at - return 2023-06-01T07:39:49.394Z
* @returns {String} message - return success
* @description SignUp account
*/
exports.Signup = (0, core_1.default)((event) => {
    return service.CreateUser(event);
}).use((0, http_json_body_parser_1.default)());
/**
* @author Nguyễn Tiến Tài
* @created_at 01/06/2023
* @param {String} email - Email
* @param {String} password - Password
* @param {Object} res - response
* @returns {Object} data - return data {}
* @returns {String} data.token - return eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMiIsImVtYWlsIjoibmd1eWVudGllbnRhaTExQGdtYWlsLmNvbSIsInBob25lIjoiMDc5ODgwNTc0MSIsImlhdCI6MTY4NTYwNzQ5NCwiZXhwIjoxNjg4MTk5NDk0fQ.cAX77Z3Ifb57o1Xa8MsGm_4U1PBjS06cx_63IS-eL44
* @returns {String} message - return success
* @description Login account
*/
exports.Login = (0, core_1.default)((event) => {
    return service.UserLogin(event);
}).use((0, http_json_body_parser_1.default)());
const Verify = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.VerifyUser(event);
    }
    else if (httpMethod === "get") {
        return service.GetVerificationToken(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, "requested method is not supported!");
    }
});
exports.Verify = Verify;
const Profile = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreateProfile(event);
    }
    else if (httpMethod === "put") {
        return service.EditProfile(event);
    }
    else if (httpMethod === "get") {
        return service.GetProfile(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, "requested method is not supported!");
    }
});
exports.Profile = Profile;
const Cart = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreateCart(event);
    }
    else if (httpMethod === "put") {
        return service.UpdateCart(event);
    }
    else if (httpMethod === "get") {
        return service.GetCart(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, "requested method is not supported!");
    }
});
exports.Cart = Cart;
const Payment = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const httpMethod = event.requestContext.http.method.toLowerCase();
    if (httpMethod === "post") {
        return service.CreatePaymentMethod(event);
    }
    else if (httpMethod === "put") {
        return service.UpdatePaymentMethod(event);
    }
    else if (httpMethod === "get") {
        return service.GetPaymentMethod(event);
    }
    else {
        return (0, response_1.ErrorResponse)(404, "requested method is not supported!");
    }
});
exports.Payment = Payment;
//# sourceMappingURL=userHandler.js.map