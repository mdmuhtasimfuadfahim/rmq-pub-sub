const validateTopic = require('../../validations/validateTopic');

describe('validateTopic_function', () => {
  // Tests that a valid topic with length between 5 and 20 characters is accepted.
  it('test_valid_topic: tests that a valid topic with length between 5 and 20 characters is accepted', () => {
    expect(() => validateTopic('valid')).not.toThrow();
  });

  // Tests that an empty topic is rejected.
  it('test_empty_topic: tests that an empty topic is rejected', () => {
    expect(() => validateTopic('')).toThrow(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that a topic with length less than 5 characters is rejected.
  it('test_short_topic: tests that a topic with length less than 5 characters is rejected', () => {
    expect(() => validateTopic('abc')).toThrow(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that the function throws an error when topic is invalid.
  it('test_throws_error: tests that the function throws an error when topic is invalid', () => {
    expect(() => validateTopic(123)).toThrow(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that a topic with length more than 20 characters is rejected.
  it('test_long_topic: tests that a topic with length more than 20 characters is rejected', () => {
    expect(() => validateTopic('this_topic_is_too_long')).toThrow(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  });

  // Tests that a topic with invalid data type is rejected.
  it('test_invalid_data_type: tests that a topic with invalid data type is rejected', () => {
    expect(() => validateTopic(null)).toThrow(
      'Invalid topic: The type of topic should be string or the lenght should not be less than 5 and more than 20'
    );
  });
});
