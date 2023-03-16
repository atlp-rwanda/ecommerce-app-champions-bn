// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

const vendorSchema = Joi.object({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
});

export default vendorSchema;
