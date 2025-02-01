import { LoggerMode } from '../app.config.provider';
import { DevLogger } from './dev.logger';
import { JsonLogger } from './json.logger';
import { TskvLogger } from './tskv.logger';

export const setLogger = (mode: LoggerMode) => {
  switch (mode) {
    case LoggerMode.dev:
      return new DevLogger();
    case LoggerMode.json:
      return new JsonLogger();
    case LoggerMode.tskv:
      return new TskvLogger();
    default:
      return new TskvLogger();
  }
};
