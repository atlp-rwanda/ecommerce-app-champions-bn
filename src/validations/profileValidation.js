
import Joi from 'joi';

const createProfile = Joi.object().keys({
  gender: Joi.string()
    .valid('male', 'female', 'Female', 'Male')
    .required()
    .label('Gender should be either male or female'),
  language: Joi.string().min(3).required().label('Enter your language'),
  country: Joi.string().min(3).required().label('Enter your country'),
  birthdate: Joi.date()
    .raw()
    .required()
    .label('Birdate Date format YYYY-MM-DD'),
  state: Joi.string().min(3).required().label('Enter your state'),
});

export default { createProfile };