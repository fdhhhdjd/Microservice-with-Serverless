//! LIBRARY
import { Length } from "class-validator";

//! DTO
import { LoginInput } from "./LoginInput";

export class SignupInput extends LoginInput {
  @Length(10, 13)
  phone: string;
}