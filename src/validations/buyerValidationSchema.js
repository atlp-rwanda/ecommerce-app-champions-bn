// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

const buyerSchema = Joi.object({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .min(6)
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
    .required()
    .label("Password")
    .messages({
      "string.pattern.base": `Password should be six characters, at least one letter, one number and one special character`
    })
});

export default buyerSchema;
