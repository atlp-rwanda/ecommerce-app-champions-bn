// eslint-disable-next-line import/no-extraneous-dependencies
import Joi from "joi";

const validateForm = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const profileSchema = Joi.object({
  country: Joi.string().min(3).trim().required().label('Enter your country'),
  gender: Joi.string().valid('male', 'female', 'Female', 'Male').required().label('Gender should be either male or female'),
  birthDate: Joi.date().raw().required().label('BirthDate Date format YYYY-MM-DD'),
  businessName: Joi.string().min(3).required().label('Enter your business name'),
  location: Joi.string().min(3).required().label('Enter your location'),
  state: Joi.string().min(3).required().label('Enter your state'),
  city: Joi.string().min(3).required().label('Enter your city'),
  businessAddress: Joi.string().min(3).required().label('Enter your business address'),
  businessNumber: Joi.string().min(1).required().label('Enter your business number'),
  accountNumber: Joi.string().min(3).required().label('Enter your account number'),
  taxIdNumber: Joi.string().min(1).required().label('Enter your tax Id number'),
  typeOfProducts: Joi.string().min(3).required().label('Enter your type of product'),
});

const validateUpdate = validateForm(profileSchema);

const profileValidation = (req, res, next) => {
  const { error } = validateUpdate(req.body);
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

export default profileValidation;
