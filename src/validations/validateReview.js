import Joi from "joi";

const ReviewSchema=Joi.object({

    title: Joi.string().required(),
    content: Joi.string().required(),
    rating: Joi.number().required(),
    userId:Joi.number(),
    productId: Joi.number().required(),


});

export default ReviewSchema;