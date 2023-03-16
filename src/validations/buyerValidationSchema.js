/* eslint-disable*/
import Joi from "joi";

export const buyerSchema = Joi.object().keys({
  firstName: Joi.string().min(2).trim().required(),
  lastName: Joi.string().min(2).trim().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string()
  .min(6)
  .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/)
  .required()
  .label(
    'Password'
  ).
  messages({
    'string.pattern.base': `Password should be six characters, at least one letter, one number and one special character`
  })
});
export const buyerUpSchema = Joi.object().keys({
  gender: Joi.string().valid('male', 'female', 'Female', 'Male').required().label('Gender should be either male or female'),
  birthDate: Joi.date().raw().required().label('BirthDate Date format YYYY-MM-DD'),
  shipingAddress: Joi.string().min(3).trim().required().label('Enter your shipping Address'),
  paymentMethod: Joi.string().required().label('Enter your payment method'),
  preferredCurency: Joi.string().min(1).required().label('Enter your currency'),
  state: Joi.string().min(3).required().label('Enter your state'),
  city: Joi.string().min(3).required().label('Enter your city'),
  postalCode: Joi.string().min(3).required().label('Enter your postal code') 
});