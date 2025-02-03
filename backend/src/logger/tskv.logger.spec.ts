import { TskvLogger } from './tskv.logger';

describe('TskvLogger tests', () => {
  let tskvLogger: TskvLogger;
  const testText = 'test text';

  beforeEach(() => (tskvLogger = new TskvLogger()));
  afterEach(() => jest.restoreAllMocks());

  it('log level should be in tskv format', () => {
    const mockFn = jest.spyOn(console, 'log').mockImplementation(() => {});
    tskvLogger.log(testText);
    const expectedResult = `level=log\tmessage=${testText}\toptionalParams=${[]}\n`;
    expect(mockFn).toHaveBeenCalledWith(expectedResult);
  });

  it('error level should be in tskv format', () => {
    const mockFn = jest.spyOn(console, 'error').mockImplementation(() => {});
    tskvLogger.error(testText);
    const expectedResult = `level=error\tmessage=${testText}\toptionalParams=${[]}\n`;
    expect(mockFn).toHaveBeenCalledWith(expectedResult);
  });

  it('warn level should be in tskv format', () => {
    const mockFn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    tskvLogger.warn(testText);
    const expectedResult = `level=warn\tmessage=${testText}\toptionalParams=${[]}\n`;
    expect(mockFn).toHaveBeenCalledWith(expectedResult);
  });
});
