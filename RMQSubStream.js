const amqp = require('amqplib');
const validateTopic = require('./validations/validateTopic');
const RabbitMQLogger = require('./config/RabbitMQLogger');
const config = require('./config/config');
const validateData = require('./validations/validateData');

/**
 * Creates a new RabbitMQ substream that consumes messages from a specified topic
 * and returns the received data. Validates the topic and data before consuming
 * and logs relevant information.
 *
 * @param {string} topic - The topic to consume messages from
 * @return {Promise<JSON>} A Promise that resolves with the received data
 * @throws {string} An error message if there was a problem consuming the topic
 */
const RMQSubStream = async (topic) => {
  // basic validations
  validateTopic(topic);

  const connection = await amqp.connect(config.AMQP_URL);
  const channel = await connection.createChannel();

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      // setting up loggers
      RabbitMQLogger.settopic(topic);
      RabbitMQLogger.info(topic, {}, `Consuming topic ${topic}`);

      await channel.assertQueue(topic);
      await channel.consume(topic, async (data) => {
        const receivedData = JSON.parse(data.content);

        validateData(receivedData);

        RabbitMQLogger.setLogData(receivedData);
        RabbitMQLogger.info(topic, receivedData, `Received topic ${topic}`);

        await channel.ack(data);
        resolve(receivedData);
      });
    } catch (error) {
      // setting up loggers
      RabbitMQLogger.debug('Error to consume', error);
      RabbitMQLogger.error(topic, 'Error: ', error.message);
      reject(error.message);
    }
  });
};

module.exports = RMQSubStream;
