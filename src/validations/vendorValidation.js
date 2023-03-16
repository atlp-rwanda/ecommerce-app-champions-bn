/* eslint-disable */
import Joi from "joi";

export const vendorSchema = Joi.object().keys({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
});

export const vendorUpSchema = Joi.object().keys({
  gender: Joi.string().valid('male', 'female', 'Female', 'Male').required().label('Gender should be either male or female'),
  birthDate: Joi.date().raw().required().label('BirthDate Date format YYYY-MM-DD'),
  businessName: Joi.string().min(3).trim().required().label('Enter your business Name'),
  businessAddress: Joi.string().min(3).trim().required().label('Enter your business address'),
  accountNumber: Joi.string().min(3).trim().required().label('Enter your account number'),
  taxIdNumber: Joi.string().min(3).trim().required().label('Enter your tax number '),
  typeOfProducts: Joi.string().min(3).trim().required().label('Enter your products'),
  state: Joi.string().min(3).required().label('Enter your state'),
  city: Joi.string().min(3).required().label('Enter your city'),
  postalCode: Joi.string().min(3).trim().required().label('Enter your postal code')
});
