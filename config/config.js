const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envVarsSchema = Joi.object()
  .keys({
    AMQP_URL: Joi.string().required().description('amqp url'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error for rabbitmq: ${error.message}`);
}

module.exports = {
  AMQP_URL: process.env.AMQP_URL,
};
