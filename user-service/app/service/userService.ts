//! LIBRARY 
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { autoInjectable } from "tsyringe";
import { plainToClass } from "class-transformer";

//! UTILS
import { AppValidationError } from "../utility/errors";
import { ErrorResponse, SuccessResponse } from "../utility/response";
import { UserRepository } from "../repository/userRepository";
import { SignupInput } from "../models/dto/SignupInput";
import { GetSalt,GetHashedPassword} from "../utility/passsword";

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
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async GetVerificationToken(event: APIGatewayProxyEventV2) {
    try {
    } catch (error) {
      console.log(error);
      return ErrorResponse(500, error);
    }
  }

  async VerifyUser(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Verify User" });
  }

  // User profile
  async CreateProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Create User Profile" });
  }

  async GetProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Get User Profile" });
  }
  async EditProfile(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Edit User Profile" });
  }

  // Cart Section
  async CreateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Create Cart" });
  }

  async GetCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Get Cart" });
  }

  async UpdateCart(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Update Cart" });
  }

  // Payment Section
  async CreatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Create Payment Method" });
  }

  async GetPaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Get Payment Method" });
  }

  async UpdatePaymentMethod(event: APIGatewayProxyEventV2) {
    return SuccessResponse({ message: "response from Update Payment Method" });
  }
}