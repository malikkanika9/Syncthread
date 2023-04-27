const Joi = require("joi");
const multer = require("multer");
const path = require("path");
const { uuid } = require("uuidv4");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        let errMsg = {};
        for (let counter in error.details) {
          let k = error.details[counter].context.key;
          let val = error.details[counter].message;
          errMsg[k] = val;
        }
        let returnErr = { status: 2, errors: errMsg };
        res.send(returnErr)
      }
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = value;
      next();
    };
  },
  schemas: {
    validateDetails: Joi.object().keys({
      name: Joi.string()
        .required()
        .min(3)
        .regex(/^[A-Za-z]*$/, "Only alphanumeric value allowed")
        .max(30),
      email: Joi.string().required().email().max(80),
      password: Joi.string()
        .required()
        .min(8)
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
          "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        ),
    }),
    validateLogin: Joi.object().keys({
      email: Joi.string().required().email().max(80),
      password: Joi.string()
        .required()
        .min(8)
        .regex(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
          "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
        )
        .max(10),
    }),
  },
};
