"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBClient = void 0;
const pg_1 = require("pg");
const DBClient = () => {
    return new pg_1.Client({
        host: "localhost",
        user: "root",
        database: "user_service",
        password: "root",
        port: 5432,
    });
};
exports.DBClient = DBClient;
//# sourceMappingURL=databaseClient.js.map