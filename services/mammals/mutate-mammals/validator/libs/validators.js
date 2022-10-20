const { body } = require('express-validator');

module.exports = {
  createMammal: [
    body('commonName')
      .notEmpty()
      .withMessage('commonName must be present')
      .isString()
      .withMessage('commonName must be a non empty string'),
    body('scientificName')
      .notEmpty()
      .withMessage('scientificName must be present')
      .isString()
      .withMessage('scientificName must be a non empty string'),
    body('status')
      .notEmpty()
      .withMessage('status must be present')
      .isString()
      .withMessage('status must be a non empty string'),
    body('lastSeen')
      .notEmpty()
      .withMessage('lastSeen must be present')
      .isString()
      .withMessage('lastSeen must be a non empty string'),
    body('count')
      .notEmpty()
      .withMessage('count must be present')
      .isInt({ min: 0 })
      .withMessage('count must be a integer larger or equal to 0'),
  ],
  updateMammal: [
    body('commonName')
      .optional()
      .notEmpty().withMessage('commonName must be a non empty')
      .isString().withMessage('commonName must be a string'),
    body('scientificName')
      .optional()
      .notEmpty().withMessage('scientificName must be a non empty')
      .isString().withMessage('scientificName must be a string'),
    body('status')
      .optional()
      .notEmpty().withMessage('status must be a non empty')
      .isString().withMessage('status must be a string'),
    body('lastSeen')
      .optional()
      .notEmpty().withMessage('lastSeen must be a non empty')
      .isString().withMessage('lastSeen must be a string'),
    body('count')
      .optional()
      .isInt({ min: 0 }).withMessage('count must be a integer greater than or equal to 0'),
  ]
}