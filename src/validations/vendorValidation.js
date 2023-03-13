// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

const validateForm = (schema) => (payload) =>

  schema.validate(payload, { abortEarly: false });

const vendorSchema = Joi.object({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
});

const validatesignUp = validateForm(vendorSchema);

const vendorValidation = (req, res, next) => {
  const { error } = validatesignUp(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      error: error.details.map(
        (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
        // eslint-disable-next-line comma-dangle
      )
    });
  } else {
    next();
  }
};

export default vendorValidation;
