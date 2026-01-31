const JOI = require("joi");

const signupValidation = (req, res, next) => {
  const schema = JOI.object({
    name: JOI.string().required(),
    email: JOI.string().email().required(),
    password: JOI.string().min(6).max(20).required(),
    phone: JOI.string().pattern(/^[0-9]{10}$/).required(),
    address: JOI.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

const loginValidation = (req, res, next) => {
  const schema = JOI.object({
    email: JOI.string().email().required(),
    password: JOI.string().min(6).max(20).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
}

module.exports = {
  signupValidation,
  loginValidation,
};