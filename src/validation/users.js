import Joi from "joi";

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Name is required.",
    "string.empty": "Name cannot be empty.",
    "string.min": "Name should be at least 3 characters long.",
    "string.max": "Name should not exceed 30 characters.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  phone: Joi.string()
    .pattern(/^\+?[0-9]{10,15}$/)
    .required()
    .messages({
      "any.required": "Phone number is required.",
      "string.empty": "Phone number cannot be empty.",
      "string.pattern.base": "Phone number format is invalid.",
    }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/)
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password should be at least 8 characters long.",
      "string.max": "Password should not exceed 64 characters.",
      "string.pattern.base":
        "Password must have 1 number and 1 special character.",
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.empty": "Email cannot be empty.",
    "string.email": "Invalid email format.",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/^(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/)
    .required()
    .messages({
      "any.required": "Password is required.",
      "string.empty": "Password cannot be empty.",
      "string.min": "Password should be at least 8 characters long.",
      "string.max": "Password should not exceed 64 characters.",
      "string.pattern.base":
        "Password must have 1 number and 1 special character.",
    }),
});
