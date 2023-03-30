import Joi from "joi";

const productSchema = Joi.object({
  productName: Joi.string().required(),
  productOwner: Joi.string().required(),
  productPrice: Joi.number().required(),
  category: Joi.string().required(),
  quantity: Joi.number().min(0).required(),
  expiredDate: Joi.date().required(),
  bonus: Joi.number().required(),
  productDescription: Joi.string().required()
});

const categorySchema = Joi.object({
  name: Joi.string().required()
});

export { productSchema, categorySchema };
