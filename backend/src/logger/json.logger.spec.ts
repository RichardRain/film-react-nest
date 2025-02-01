import { JsonLogger } from "./json.logger";

describe('JsonLogger tests', () => {
  let jsonLogger: JsonLogger;
  const testText = 'test text';

  beforeEach(() => jsonLogger = new JsonLogger());
  afterEach(() => jest.restoreAllMocks());

  it('log level should be in json format', () => {
    const mockFn = jest.spyOn(console, 'log').mockImplementation(() => {});
    jsonLogger.log(testText);
    const expectedResult = JSON.stringify({
      level: 'log',
      message: testText,
      optionalParams: [],
    });
    expect(mockFn).toHaveBeenCalledWith(expectedResult);
  });

  it('error level should be in json format', () => {
    const mockFn = jest.spyOn(console, 'error').mockImplementation(() => {});
    jsonLogger.error(testText);
    const expectedResult = JSON.stringify({
      level: 'error',
      message: testText,
      optionalParams: [],
    });
    expect(mockFn).toHaveBeenCalledWith(expectedResult);
  });

  it('warn level should be in json format', () => {
    const mockFn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    jsonLogger.warn(testText);
    const expectedResult = JSON.stringify({
      level: 'warn',
      message: testText,
      optionalParams: [],
    });
    expect(mockFn).toHaveBeenCalledWith(expectedResult);
  });
});