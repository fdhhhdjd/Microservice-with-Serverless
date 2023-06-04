//! LIBRARY
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";

//! UTILS
import { AppValidationError } from "../utility/errors";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import {
  GetSalt,
  GetHashedPassword,
  GetToken,
  ValidatePassword,
  VerifyToken,
} from "../utility/passsword";
import {
  GenerateAccessCode,
  SendVerificationCode,
} from "../utility/notification";
import { TimeDifference } from "../utility/dateHelper";

//! REPOSITORIES
import { UserRepository } from "../repository/userRepository";

//! MODELS
import { SignupInput } from "../models/dto/SignupInput";
import { LoginInput } from "../models/dto/LoginInput";
import { VerificationInput } from "../models/dto/UpdateInput";
import { ProfileInput } from "../models/dto/AddressInput";

@autoInjectable()
export class UserService {
  repository: UserRepository;
  constructor(repository: UserRepository) {
    this.repository = repository;
  }

  // User Creation, Validation & Login
  async CreateUser(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(SignupInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);

      const salt = await GetSalt();
      const hashedPassword = await GetHashedPassword(input.password, salt);
      const data = await this.repository.createAccount({
        email: input.email,
        password: hashedPassword,
        phone: input.phone,
        userType: "BUYER",
        salt: salt,
      });

      return SuccessResponse(data);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  // User Login
  async UserLogin(event: APIGatewayProxyEventV2) {
    try {
      const input = plainToClass(LoginInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);
      const data = await this.repository.findAccount(input.email);
      console.log(data, data);
      const verified = await ValidatePassword(
        input.password,
        data.password,
        data.salt
      );
      console.log(verified, verified);
      if (!verified) {
        throw new Error("password does not match!");
      }
      const token = GetToken(data);

      return SuccessResponse({ token });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  // Get verification token
  async GetVerificationToken(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    console.log(token, "token");
    const payload = await VerifyToken(token);

    if (!payload) return ErrorResponse(403, "authorization failed!");
    console.log(payload, "payload");

    const { code, expiry } = GenerateAccessCode();
    await this.repository.updateVerificationCode(payload.user_id, code, expiry);

    // await SendVerificationCode(code, payload.phone);

    return SuccessResponse({
      message: "verification code is sent to your registered mobile number!",
    });
  }

  // Get verification user
  async VerifyUser(event: APIGatewayProxyEventV2) {
    const token = event.headers.authorization;
    const payload = await VerifyToken(token);
    if (!payload) return ErrorResponse(403, "authorization failed!");

    const input = plainToClass(VerificationInput, event.body);
    const error = await AppValidationError(input);
    if (error) return ErrorResponse(404, error);

    const { verification_code, expiry } = await this.repository.findAccount(
      payload.email
    );
    console.log(verification_code, 'verification_code');
    // find the user account
    if (verification_code === parseInt(input.code)) {
      // check expiry
      const currentTime = new Date();
      const diff = TimeDifference(expiry, currentTime.toISOString(), "m");
      console.log("time diff", diff);

      if (diff > 0) {
        console.log("verified successfully!");
        await this.repository.updateVerifyUser(payload.user_id);
      } else {
        return ErrorResponse(403, "verification code is expired!");
      }
    }
    return SuccessResponse({ message: "user verified!" });
  }

  // User profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization;
      const payload = await VerifyToken(token);
      if (!payload) return ErrorResponse(403, "authorization failed!");

      const input = plainToClass(ProfileInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);

      console.log(payload, '-----', input);
      const result = await this.repository.createProfile(
        payload.user_id,
        input
      );
      return SuccessResponse({ message: "profile created!" });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  // Get Profile
  async GetProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization;
      const payload = await VerifyToken(token);
      if (!payload) return ErrorResponse(403, "authorization failed!");
      const result = await this.repository.getUserProfile(payload.user_id);
      return SuccessResponse(result);
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  // Edit Profile
  async EditProfile(event: APIGatewayProxyEventV2) {
    try {
      const token = event.headers.authorization;
      const payload = await VerifyToken(token);
      if (!payload) return ErrorResponse(403, "authorization failed!");

      const input = plainToClass(ProfileInput, event.body);
      const error = await AppValidationError(input);
      if (error) return ErrorResponse(404, error);

      await this.repository.editProfile(payload.user_id, input);
      return SuccessResponse({ message: "profile updated!" });
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }
}
