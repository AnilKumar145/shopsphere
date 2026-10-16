/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-15A — Enterprise Structured Client-Side Logger
 * Module 15: Enterprise Architecture & Production Readiness (Unit 15.6)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Implement a singleton logging service with structured entry
 *    formats, severity levels (debug, info, warn, error), and ring buffer history.
 * 📖 Reference Spec: change-requests/CR-15A/request.md
 * 🌟 Golden Solution: shopsphere-solution/src/services/logger.ts
 * ============================================================================
 */

import { appConfig } from '../config/appConfig';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  readonly id: string;
  readonly timestamp: string;
  readonly level: LogLevel;
  readonly message: string;
  readonly context?: Record<string, unknown>;
  readonly stack?: string;
}

export class AppError extends Error {
  public readonly code: string;
  public readonly context?: Record<string, unknown>;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', context?: Record<string, unknown>) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
  }
}

export class HttpError extends AppError {
  public readonly status: number;

  constructor(message: string, status: number, context?: Record<string, unknown>) {
    super(message, `HTTP_${status}`, context);
    this.name = 'HttpError';
    this.status = status;
  }
}

export class ValidationError extends AppError {
  public readonly fieldErrors: Record<string, string>;

  constructor(message: string, fieldErrors: Record<string, string>) {
    super(message, 'VALIDATION_ERROR', { fieldErrors });
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
  }
}

/**
 * 📝 STEP 1: Log Entry Factory
 * 📝 STEP 2: Severity Routing (debug, info, warn, error)
 * 📝 STEP 3: Memory Ring Buffer (maximum 100 entries)
 * 📝 STEP 4: Buffer Retrieval and Clearing
 */
export class LoggerService {
  private logs: LogEntry[] = [];
  private readonly maxLogs: number = 100;

  private createEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
    stack?: string
  ): LogEntry {
    const entry: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      stack,
    };

    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    return entry;
  }

  public debug(message: string, context?: Record<string, unknown>): void {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    if (appConfig.featureFlags.enableAuditLogging) {
      this.createEntry('debug', message, context);
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  }

  public info(message: string, context?: Record<string, unknown>): void {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    this.createEntry('info', message, context);
    console.info(`[INFO] ${message}`, context || '');
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    this.createEntry('warn', message, context);
    console.warn(`[WARN] ${message}`, context || '');
  }

  public error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    const stack = error instanceof Error ? error.stack : undefined;
    const errorDetails = error instanceof AppError ? { ...error.context, code: error.code } : context;
    this.createEntry('error', message, errorDetails, stack);
    console.error(`[ERROR] ${message}`, error || '', context || '');
  }

  public getLogs(): readonly LogEntry[] {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    return [...this.logs];
  }

  public clear(): void {
    // TODO: [STUDENT IMPLEMENTATION REQUIRED]
    this.logs = [];
  }
}

export const logger = new LoggerService();
