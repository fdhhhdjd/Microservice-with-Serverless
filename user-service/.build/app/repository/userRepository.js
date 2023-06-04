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
const dbOperation_1 = require("./dbOperation");
class UserRepository extends dbOperation_1.DBOperation {
    constructor() {
        super();
    }
    // Create account
    createAccount({ phone, email, password, salt, userType }) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "INSERT INTO users(phone,email,password,salt,user_type) VALUES($1,$2,$3,$4,$5) RETURNING *";
            const values = [phone, email, password, salt, userType];
            const result = yield this.executeQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
        });
    }
    // Find Account
    findAccount(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "SELECT user_id, email, password, phone, salt, verification_code, expiry FROM users WHERE email = $1";
            const values = [email];
            const result = yield this.executeQuery(queryString, values);
            if (result.rowCount < 1) {
                throw new Error("user does not exist with provided email id!");
            }
            return result.rows[0];
        });
    }
    // Update Verification
    updateVerificationCode(userId, code, expiry) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "UPDATE users SET verification_code=$1, expiry=$2 WHERE user_id=$3 AND verified=FALSE RETURNING *";
            const values = [code, expiry, userId];
            const result = yield this.executeQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
            throw new Error("user already verified!");
        });
    }
    // Update Verification user
    updateVerifyUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "UPDATE users SET verified=TRUE WHERE user_id=$1 AND verified=FALSE RETURNING *";
            const values = [userId];
            const result = yield this.executeQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
            throw new Error("user already verified!");
        });
    }
    updateUser(user_id, firstName, lastName, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryString = "UPDATE users SET first_name=$1, last_name=$2, user_type=$3 WHERE user_id=$4 RETURNING *";
            const values = [firstName, lastName, userType, user_id];
            const result = yield this.executeQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
            throw new Error("error while updating user!");
        });
    }
    // Create Profile
    createProfile(user_id, { firstName, lastName, userType, address: { addressLine1, addressLine2, city, postCode, country }, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateUser(user_id, firstName, lastName, userType);
            const queryString = "INSERT INTO address(user_id, address_line1,address_line2,city,post_code,country) VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
            const values = [
                user_id,
                addressLine1,
                addressLine2,
                city,
                postCode,
                country,
            ];
            const result = yield this.executeQuery(queryString, values);
            if (result.rowCount > 0) {
                return result.rows[0];
            }
            throw new Error("error while creating profile!");
        });
    }
    // Get Profile
    getUserProfile(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileQuery = "SELECT first_name, last_name, email, phone, user_type, verified FROM users WHERE user_id=$1";
            const profileValues = [user_id];
            const profileResult = yield this.executeQuery(profileQuery, profileValues);
            if (profileResult.rowCount < 1) {
                throw new Error("user profile does not exist!");
            }
            const userProfile = profileResult.rows[0];
            const addressQuery = "SELECT id, address_line1, address_line2, city, post_code, country FROM address WHERE user_id=$1";
            const addressValues = [user_id];
            const addressResult = yield this.executeQuery(addressQuery, addressValues);
            if (addressResult.rowCount > 0) {
                userProfile.address = addressResult.rows;
            }
            return userProfile;
        });
    }
    // Edit profile
    editProfile(user_id, { firstName, lastName, userType, address: { addressLine1, addressLine2, city, postCode, country, id }, }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateUser(user_id, firstName, lastName, userType);
            const addressQuery = "UPDATE address SET address_line1=$1, address_line2=$2, city=$3, post_code=$4, country=$5 WHERE id=$6";
            const addressValues = [
                addressLine1,
                addressLine2,
                city,
                postCode,
                country,
                id,
            ];
            const addressResult = yield this.executeQuery(addressQuery, addressValues);
            if (addressResult.rowCount < 1) {
                throw new Error("error while updating profile!");
            }
            return true;
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=userRepository.js.map