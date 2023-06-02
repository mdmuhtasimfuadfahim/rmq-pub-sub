const Joi = require('joi');
const validateData = require('../../validations/validateData');

describe('validateData_function', () => {
  // Tests that providing a valid data object should not throw an error.
  it('test_valid_data_does_not_throw_error', () => {
    const validData = { name: 'John', age: 30 };
    expect(() => validateData(validData)).not.toThrow();
  });

  // Tests that providing no data should throw an error.
  it('test_no_data_throws_error', () => {
    expect(() => validateData()).toThrow('Invalid data: No data found to produce');
  });

  // Tests that providing data of a type other than object should throw an error.
  it('test_non_object_data_throws_error', () => {
    const invalidData = 'not an object';
    expect(() => validateData(invalidData)).toThrow('Invalid data: The type of data should be object');
  });

  // Tests that the function uses the Joi library to validate the data object.
  it('test_uses_joi_library_to_validate_data', () => {
    const mockJoi = jest.spyOn(Joi, 'object').mockReturnValue({
      keys: jest.fn().mockReturnThis(),
      unknown: jest.fn().mockReturnThis(),
      prefs: jest.fn().mockReturnThis(),
      validate: jest.fn().mockReturnValue({ error: null }),
    });

    const validData = { name: 'John', age: 30 };
    validateData(validData);

    expect(mockJoi).toHaveBeenCalled();

    mockJoi.mockRestore();
  });

  // Tests that the function throws an error with a specific message if validation fails.
  it('test_throws_specific_error_message_on_validation_failure', () => {
    const mockJoi = jest.spyOn(Joi, 'object').mockReturnValue({
      keys: jest.fn().mockReturnThis(),
      unknown: jest.fn().mockReturnThis(),
      prefs: jest.fn().mockReturnThis(),
      validate: jest.fn().mockReturnValue({ error: new Error('validation error') }),
    });

    const invalidData = { name: 'John', age: 'thirty' };
    expect(() => validateData(invalidData)).toThrow('Invalid data: The type of data should be object');

    mockJoi.mockRestore();
  });

  // Tests that the function can benefit from using a test double for the Joi library.
  it('test_mocking_joi_library', () => {
    const mockJoi = jest.spyOn(Joi, 'object').mockReturnValue({
      keys: jest.fn().mockReturnThis(),
      unknown: jest.fn().mockReturnThis(),
      prefs: jest.fn().mockReturnThis(),
      validate: jest.fn().mockReturnValue({ error: null }),
    });

    const validData = { name: 'John', age: 30 };
    validateData(validData);

    expect(mockJoi).toHaveBeenCalled();

    mockJoi.mockRestore();
  });
});
