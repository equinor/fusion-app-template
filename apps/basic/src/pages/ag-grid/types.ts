/**
 * @fileoverview Type definitions for the AG Grid demo page.
 */

/**
 * Employee record displayed in the AG Grid demo.
 *
 * All fields are readonly to enforce immutability of row data.
 */
export interface Employee {
  /** Unique identifier */
  readonly id: number;
  /** Full name */
  readonly name: string;
  /** Department the employee belongs to */
  readonly department: string;
  /** Annual salary in USD */
  readonly salary: number;
  /** ISO-8601 date string for the employee's start date */
  readonly startDate: string;
  /** Whether the employee is currently active */
  readonly active: boolean;
}
