/* eslint-disable */
import Joi from "joi";

export const vendorSignup = Joi.object().keys({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
});

export const vendorLogin = Joi.object().keys({
  email:Joi.string().email().lowercase().trim().required(),
  password:Joi.string().trim().required()
});

