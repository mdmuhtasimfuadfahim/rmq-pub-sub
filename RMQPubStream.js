const amqp = require('amqplib');
const RabbitMQLogger = require('./config/RabbitMQLogger');
const validateTopic = require('./validations/validateTopic');
const validateData = require('./validations/validateData');
const config = require('./config/config');

/**
 * Sends a message to a RabbitMQ topic after basic validation and logging.
 *
 * @param {string} topic - the RabbitMQ topic to publish to
 * @param {Object} [data={}] - the data to publish to the topic
 * @return {Promise<string>} a Promise that resolves with a success message or rejects with an error message
 */
const RMQPubStream = async (topic, data = {}) => {
  // basic validation
  validateTopic(topic);
  validateData(data);

  const connection = await amqp.connect(config.AMQP_URL);
  const channel = await connection.createChannel();
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      // setting up loggers
      RabbitMQLogger.settopic(topic);
      RabbitMQLogger.setLogData(data);

      await channel.assertQueue(topic);

      channel.sendToQueue(topic, Buffer.from(JSON.stringify(data)));
      await channel.close();
      connection.close();

      RabbitMQLogger.info(topic, data, `Message has been broadcast on ${topic}`);
      resolve(`${topic} has been broadcasted`);
    } catch (error) {
      // setting up loggers
      RabbitMQLogger.debug('Error to publish', error);
      RabbitMQLogger.error(topic, {}, error.message);
      reject(error.message);
    }
  });
};

module.exports = RMQPubStream;
