const { validationResult } = require('express-validator');

/**
 * Middleware to validate request data
 * Uses express-validator to check for validation errors
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { validate };
