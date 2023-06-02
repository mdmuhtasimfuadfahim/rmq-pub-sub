const amqp = require('amqplib');
const RMQSubStream = require('../RMQSubStream');
const RMQPubStream = require('../RMQPubStream');

describe('RMQSubStream_function', () => {
  // Tests that the function successfully consumes a topic and receives data.
  it('test_successful_topic_consumption', async () => {
    const topic = 'valid_topic';
    const data = { message: 'valid_data' };

    await RMQPubStream(topic, data);
    const result = await RMQSubStream(topic);
    expect(result).toEqual(data);
  });

  // Tests that the function throws an error when an invalid topic name is provided.
  it('test_invalid_topic_name', async () => {
    const topic = '';
    await expect(RMQSubStream(topic)).rejects.toThrow();
  });

  // Tests that the function throws an error when an null topic name is provided.
  it('test_null_topic_name', async () => {
    const topic = null;
    await expect(RMQSubStream(topic)).rejects.toThrow();
  });

  // Tests that the function throws an error when an undefined topic name is provided.
  it('test_undefined_topic_name', async () => {
    const topic = undefined;
    await expect(RMQSubStream(topic)).rejects.toThrow();
  });

  // Tests that the function throws an error when there is an error connecting to the AMQP server.
  it('test_error_connecting_to_AMQP_server', async () => {
    const topic = 'valid_topic';
    jest.spyOn(amqp, 'connect').mockImplementation(() => {
      throw new Error('Error connecting to AMQP server');
    });
    await expect(RMQSubStream(topic)).rejects.toThrow();
  });
});
