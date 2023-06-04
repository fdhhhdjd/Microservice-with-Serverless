"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileInput = exports.AddressInput = void 0;
const class_validator_1 = require("class-validator");
class AddressInput {
}
__decorate([
    (0, class_validator_1.Length)(3, 32),
    __metadata("design:type", String)
], AddressInput.prototype, "addressLine1", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 12),
    __metadata("design:type", String)
], AddressInput.prototype, "city", void 0);
__decorate([
    (0, class_validator_1.Length)(4, 6),
    __metadata("design:type", String)
], AddressInput.prototype, "postCode", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 3),
    __metadata("design:type", String)
], AddressInput.prototype, "country", void 0);
exports.AddressInput = AddressInput;
class ProfileInput {
}
__decorate([
    (0, class_validator_1.Length)(3, 32),
    __metadata("design:type", String)
], ProfileInput.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 32),
    __metadata("design:type", String)
], ProfileInput.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.Length)(5, 6),
    __metadata("design:type", String)
], ProfileInput.prototype, "userType", void 0);
exports.ProfileInput = ProfileInput;
//# sourceMappingURL=AddressInput.js.map