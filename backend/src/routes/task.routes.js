const express = require('express');
const { body, param } = require('express-validator');
const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');
const { validate } = require('../middleware/validation.middleware');

const router = express.Router();

// All routes are protected
router.use(protect);

/**
 * @route GET /api/tasks
 * @desc Get all tasks for the current user
 * @access Private
 */
router.get('/', getTasks);

/**
 * @route GET /api/tasks/:id
 * @desc Get a single task by ID
 * @access Private
 */
router.get(
  '/:id',
  [
    param('id').notEmpty().withMessage('Task ID is required'),
    validate
  ],
  getTaskById
);

/**
 * @route POST /api/tasks
 * @desc Create a new task
 * @access Private
 */
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('status')
      .optional()
      .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
      .withMessage('Status must be TODO, IN_PROGRESS, or COMPLETED'),
    body('dueDate')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date'),
    validate
  ],
  createTask
);

/**
 * @route PUT /api/tasks/:id
 * @desc Update a task
 * @access Private
 */
router.put(
  '/:id',
  [
    param('id').notEmpty().withMessage('Task ID is required'),
    body('status')
      .optional()
      .isIn(['TODO', 'IN_PROGRESS', 'COMPLETED'])
      .withMessage('Status must be TODO, IN_PROGRESS, or COMPLETED'),
    body('dueDate')
      .optional()
      .isISO8601()
      .withMessage('Due date must be a valid date'),
    validate
  ],
  updateTask
);

/**
 * @route DELETE /api/tasks/:id
 * @desc Delete a task
 * @access Private
 */
router.delete(
  '/:id',
  [
    param('id').notEmpty().withMessage('Task ID is required'),
    validate
  ],
  deleteTask
);

module.exports = router;
