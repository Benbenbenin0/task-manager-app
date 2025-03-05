const express = require('express');
const { body } = require('express-validator');
const { getProfile, updateProfile } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

/**
 * @route GET /api/users/me
 * @desc Get current user profile
 * @access Private
 */
router.get('/me', protect, getProfile);

/**
 * @route PUT /api/users/me
 * @desc Update user profile
 * @access Private
 */
router.put(
  '/me',
  [
    protect,
    body('email').optional().isEmail().withMessage('Please include a valid email'),
    body('password')
      .optional()
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
    validate
  ],
  updateProfile
);

module.exports = router;
