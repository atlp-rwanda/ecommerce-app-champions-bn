/* eslint-disable */
import Joi from "joi";

export const vendorSchema = Joi.object().keys({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
});
