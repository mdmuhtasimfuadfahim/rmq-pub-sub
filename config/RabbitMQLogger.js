const winston = require('winston');

/**
 * Returns the current date and time in UTC string format.
 *
 * @return {string} The current date and time in UTC string format.
 */
const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};

class LoggerService {
  constructor() {
    this.log_data = null;
    this.topic = '';

    const logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: `rabbitmq.log`,
        }),
        new winston.transports.Console(),
      ],
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message} | `;
        message = info.data ? `${message}data:${JSON.stringify(info.data)} | ` : message;
        message = this.log_data ? `${message}log_data:${JSON.stringify(this.log_data)} | ` : message;
        return message;
      }),
    });
    this.logger = logger;
  }

  /**
   * Sets the log data for the object.
   *
   * @param {any} logData - The log data to be set.
   */
  setLogData(logData) {
    this.log_data = logData;
  }

  /**
   * Sets the topic of the object to the provided value.
   *
   * @param {any} topic - The new topic to set.
   */
  settopic(topic) {
    this.topic = topic;
  }

  /**
   * Sets the topic and logs a message with accompanying data at the 'info' level.
   *
   * @param {any} topic - the topic to be set
   * @param {any} data - the data to be logged
   * @param {string} message - the message to be logged
   * @return {Promise<void>} - a Promise that resolves when the logging is complete
   */
  async info(topic, data, message) {
    this.topic = topic;
    this.logger.log('info', message, {
      data,
    });
  }

  /**
   * Logs a debug message and associated data.
   *
   * @param {any} message - The message to log.
   * @param {any} data - The associated data to log.
   * @return {Promise<void>} - A Promise that resolves when the logging is complete.
   */
  async debug(message, data) {
    this.logger.log('debug', message, {
      data,
    });
  }

  /**
   * Asynchronously logs an error message with associated data and topic.
   *
   * @param {string} topic - The topic of the error message.
   * @param {any} data - The associated data with the error message.
   * @param {string} message - The error message to be logged.
   */
  async error(topic, data, message) {
    this.topic = topic;
    this.logger.log('error', message, {
      data,
    });
  }
}

const RabbitMQLogger = new LoggerService();
module.exports = RabbitMQLogger;
