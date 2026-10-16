/**
 * ============================================================================
 * 🎓 TRAINEE EXERCISE: CR-15A — Structured Enterprise Logger & Exception Hierarchy
 * Module 15: Enterprise React Application Architecture (Units 15.1, 15.4, 15.10)
 * ----------------------------------------------------------------------------
 * 🎯 Objective: Provide centralized structured logging with ISO timestamps and
 *    custom exception hierarchy (AppError, HttpError, ValidationError).
 * 📁 Reference: shopsphere-solution/src/services/logger.ts
 * ============================================================================
 */

/**
 * Centralized Enterprise Logger and Exception Handling Service
 * Demonstrates Module 15: 15.4 Service Architecture, 15.7 Code Quality
 * Demonstrates Module 16: 16.6 Production Diagnostics
 */

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
  public readonly timestamp: string;
  public readonly context?: Record<string, unknown>;

  constructor(message: string, code: string = 'APP_ERROR', context?: Record<string, unknown>) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.timestamp = new Date().toISOString();
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

class LoggerService {
  private logs: LogEntry[] = [];
  private readonly maxLogs: number = 100;

  private createEntry(level: LogLevel, message: string, context?: Record<string, unknown>, stack?: string): LogEntry {
    const entry: LogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
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
    const entry = this.createEntry('debug', message, context);
    if (import.meta.env?.VITE_DEBUG_MODE === 'true') {
      console.debug(`[DEBUG] ${entry.timestamp} - ${message}`, context || '');
    }
  }

  public info(message: string, context?: Record<string, unknown>): void {
    const entry = this.createEntry('info', message, context);
    console.info(`[INFO] ${entry.timestamp} - ${message}`, context || '');
  }

  public warn(message: string, context?: Record<string, unknown>): void {
    const entry = this.createEntry('warn', message, context);
    console.warn(`[WARN] ${entry.timestamp} - ${message}`, context || '');
  }

  public error(message: string, error?: unknown, context?: Record<string, unknown>): void {
    const stack = error instanceof Error ? error.stack : undefined;
    const errorDetails = error instanceof AppError ? { ...error.context, code: error.code } : context;
    const entry = this.createEntry('error', message, errorDetails, stack);
    console.error(`[ERROR] ${entry.timestamp} - ${message}`, error || '', context || '');
  }

  public getLogs(): readonly LogEntry[] {
    return [...this.logs];
  }

  public clear(): void {
    this.logs = [];
  }
}

export const logger = new LoggerService();
