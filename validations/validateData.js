const Joi = require('joi');

/**
 * Validates the given data object using the Joi schema for Pub/Sub data.
 *
 * @param {Object} data - The data object to validate.
 * @throws {Error} If no data is provided or if the data is not an object.
 */
const validateData = (data) => {
  if (!data) {
    throw new Error('Invalid data: No data found to produce');
  }

  const pubSubDataSchema = Joi.object().keys().unknown();

  const { error } = pubSubDataSchema.prefs({ errors: { label: 'key' } }).validate(data);

  if (error) {
    throw new Error('Invalid data: The type of data should be object');
  }
};

module.exports = validateData;
