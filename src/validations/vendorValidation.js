// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

<<<<<<< HEAD
const validateForm = (schema) => (payload) =>

  schema.validate(payload, { abortEarly: false });

=======
>>>>>>> aa00130 (ft-register-vendor:)
const vendorSchema = Joi.object({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
});

export default vendorSchema;
