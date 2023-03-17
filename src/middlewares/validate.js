/*eslint-disable*/
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send({
      status: 400,
      data: { message: error.details[0].message.replace(/[/"]+/g, ""), error }
    });
  }
  next();
};

export default validate;

