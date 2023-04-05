import Joi from "joi";

const updateCartSchema = Joi.object().keys({
  quantity: Joi.number().required()
});

export default updateCartSchema;