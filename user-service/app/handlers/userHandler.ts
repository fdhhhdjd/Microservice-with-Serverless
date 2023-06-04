
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


/**
* @author Nguyễn Tiến Tài
* @created_at 04/06/2023
* @returns {String} message - return success
* @description GetVerification Code
*/
export const GetVerificationCode = middy((event: APIGatewayProxyEventV2) => {
  return service.GetVerificationToken(event);
}).use(bodyParser());

/**
* @author Nguyễn Tiến Tài
* @created_at 04/06/2023
* @param {Number} code - Code example 123456
* @param {Object} res - response
* @returns {String} message - return success
* @description Verify code
*/
export const Verify = middy((event: APIGatewayProxyEventV2) => {
  return service.VerifyUser(event);
}).use(bodyParser());


/**
* @author Nguyễn Tiến Tài
* @created_at 04/06/2023
* @param {String} firstName - FirstName
* @param {String} lastName - LastName
* @param {String} userType - UserType example BUYER
* @param {Object} address - Address {}
* @param {String} address.addressLine1 - AddressLine1
* @param {String} address.addressLine2 - AddressLine2
* @param {String} address.city - City
* @param {String} address.postCode - PostCode
* @param {String} address.country - Country
* @param {Object} res - response
* @returns {Object} data - data {}
* @returns {String} data.message - return message profile created!
* @returns {String} message - return success
* @description Create Profile
*/
export const CreateProfile = middy((event: APIGatewayProxyEventV2) => {
  return service.CreateProfile(event);
}).use(bodyParser());


/**
* @author Nguyễn Tiến Tài
* @created_at 04/06/2023
* @param {String} firstName - FirstName
* @param {String} lastName - LastName
* @param {String} userType - UserType example BUYER
* @param {Object} address - Address {}
* @param {String} address.id - id
* @param {String} address.addressLine1 - AddressLine1
* @param {String} address.addressLine2 - AddressLine2
* @param {String} address.city - City
* @param {String} address.postCode - PostCode
* @param {String} address.country - Country
* @param {Object} res - response
* @returns {Object} data - data {}
* @returns {String} data.message - return message profile updated!
* @returns {String} message - return success
* @description Edit Profile
*/
export const EditProfile = middy((event: APIGatewayProxyEventV2) => {
  return service.EditProfile(event);
}).use(bodyParser());


/**
* @author Nguyễn Tiến Tài
* @created_at 04/06/2023
* @param {Object} res - response
* @returns {Object} data - data {}
* @returns {String} data.first_name - return first_name
* @returns {String} data.last_name - return last_name
* @returns {String} data.email - return email
* @returns {String} data.phone - return phone
* @returns {String} data.first_name - return first_name
* @returns {String} data.user_type - return user_type
* @returns {String} data.verified - return verified
* @returns {Object} data.address - return address {}
* @returns {String} data.address.id - return id 
* @returns {String} data.address.address_line1 - return address_line1 
* @returns {String} data.address.address_line2 - return address_line2 
* @returns {String} data.address.city - return city 
* @returns {Number} data.address.post_code - return post_code 
* @returns {String} data.address.country - return country 
* @returns {String} message - return success
* @description Get Profile
*/
export const GetProfile = middy((event: APIGatewayProxyEventV2) => {
  return service.GetProfile(event);
}).use(bodyParser());

