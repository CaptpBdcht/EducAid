import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

export enum LogLevel {
  Nothing = 0,
  Error = 1,
  Warning = 2,
  Log = 3
}

export interface LogInfo {
  class: string;
  method: string;
  message: string;
  level: LogLevel;
}

@Injectable()
export class LoggerService {

  private debugEnabled: boolean;
  private logStack: string[];

  constructor() {
    this.debugEnabled = (environment.debugLevel !== 0);
    this.logStack = new Array();
  }

  public log(logInfo: LogInfo): void {
    const logMessage = this.formatLogInfo(logInfo);
    this.logStack.push(logMessage);

    if (this.debugEnabled && environment.debugLevel >= logInfo.level) {
      this.writeLog(logMessage, logInfo.level);
    }
  }

  private writeLog(message: string, level: LogLevel) {
    switch (level) {
      case 1: console.error(message); break;
      case 2: console.warn(message); break;
      case 3: console.log(message); break;
      default: console.debug(message); break;
    }
  }

  private formatLogInfo(logInfo: LogInfo): string {
    return this.logHeader(logInfo.level)
           + logInfo.class + '#' + logInfo.method + ': '
           + logInfo.message;
  }

  private logHeader(level: LogLevel): string {
    switch (level) {
      case 1:
      case 2: return '[!] ';
      case 3: return '[~] ';
      default: return '';
    }
  }
}
