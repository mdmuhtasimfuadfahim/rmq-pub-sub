const amqp = require('amqplib');
const RMQPubStream = require('../RMQPubStream');
const RabbitMQLogger = require('../config/RabbitMQLogger');

describe('RMQPubStream_function', () => {
  // Tests that the function works correctly when valid topic and data are provided.
  it('test_valid_topic_and_data', async () => {
    const topic = 'valid_topic';
    const data = { message: 'valid_data' };
    const result = await RMQPubStream(topic, data);
    expect(result).toBe(`${topic} has been broadcasted`);
  });

  // Tests that the function works correctly when a valid topic is provided and an empty data object is passed.
  it('test_valid_topic_empty_data', async () => {
    const topic = 'valid_topic';
    const result = await RMQPubStream(topic);
    expect(result).toBe(`${topic} has been broadcasted`);
  });

  // Tests that the function throws an error when an empty string is passed as the topic.
  it('test_invalid_empty_topic', async () => {
    const topic = '';
    await expect(RMQPubStream(topic)).rejects.toThrow(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that the function throws an error when a null value is passed as the topic.
  it('test_invalid_null_topic', async () => {
    const topic = null;
    await expect(RMQPubStream(topic)).rejects.toThrow(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that the RabbitMQLogger methods are called with the correct arguments.
  it('test_logger_methods_called', async () => {
    const topic = 'valid_topic';
    const data = { message: 'valid_data' };
    const setTopicSpy = jest.spyOn(RabbitMQLogger, 'settopic');
    const setLogDataSpy = jest.spyOn(RabbitMQLogger, 'setLogData');
    const infoSpy = jest.spyOn(RabbitMQLogger, 'info');
    await RMQPubStream(topic, data);
    expect(setTopicSpy).toHaveBeenCalledWith(topic);
    expect(setLogDataSpy).toHaveBeenCalledWith(data);
    expect(infoSpy).toHaveBeenCalledWith(topic, data, `Message has been broadcast on ${topic}`);
  });

  // Tests that the function throws an error when an undefined value is passed as the topic.
  it('test_invalid_undefined_topic', async () => {
    const topic = undefined;
    await expect(RMQPubStream(topic)).rejects.toThrow(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that the function throws an error when a non-object value is passed as data.
  it('test_invalid_non_object_data', async () => {
    const topic = 'valid_topic';
    const data = 'invalid_data';
    await expect(RMQPubStream(topic, data)).rejects.toThrow('Invalid data: The type of data should be object');
  });

  // Tests that the function works correctly when a valid topic is provided and an empty object is passed.
  it('test_invalid_empty_data', async () => {
    const topic = 'valid_topic';
    const data = {};

    const result = await RMQPubStream(topic, data);
    expect(result).toBe(`${topic} has been broadcasted`);
  });

  // Tests that the function throws an error when the connection to the AMQP server fails.
  it('test_connection_failure', async () => {
    const topic = 'valid_topic';
    const data = { message: 'valid_data' };
    const connectStub = jest.spyOn(amqp, 'connect').mockImplementation(() => {
      throw new Error('Connection failed');
    });
    await expect(RMQPubStream(topic, data)).rejects.toThrow('Connection failed');
    connectStub.mockRestore();
  });
});
