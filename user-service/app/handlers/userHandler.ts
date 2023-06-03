
//! LIBRARY
import { APIGatewayProxyEventV2 } from "aws-lambda";
import middy from "@middy/core";
import bodyParser from "@middy/http-json-body-parser";
import { container } from "tsyringe";

// //! SERVICE
import { UserService } from "../service/userService";

// //! UTILS
import { ErrorResponse } from "../utility/response";

const service = container.resolve(UserService);

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
export const Signup = middy((event: APIGatewayProxyEventV2) => {
  return service.CreateUser(event);
}).use(bodyParser());

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
export const Login = middy((event: APIGatewayProxyEventV2) => {
  return service.UserLogin(event);
}).use(bodyParser());


export const Verify = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.VerifyUser(event);
  } else if (httpMethod === "get") {
    return service.GetVerificationToken(event);
  } else {
    return ErrorResponse(404, "requested method is not supported!");
  }
};

export const Profile = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreateProfile(event);
  } else if (httpMethod === "put") {
    return service.EditProfile(event);
  } else if (httpMethod === "get") {
    return service.GetProfile(event);
  } else {
    return ErrorResponse(404, "requested method is not supported!");
  }
};

export const Cart = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreateCart(event);
  } else if (httpMethod === "put") {
    return service.UpdateCart(event);
  } else if (httpMethod === "get") {
    return service.GetCart(event);
  } else {
    return ErrorResponse(404, "requested method is not supported!");
  }
};

export const Payment = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase();
  if (httpMethod === "post") {
    return service.CreatePaymentMethod(event);
  } else if (httpMethod === "put") {
    return service.UpdatePaymentMethod(event);
  } else if (httpMethod === "get") {
    return service.GetPaymentMethod(event);
  } else {
    return ErrorResponse(404, "requested method is not supported!");
  }
};
