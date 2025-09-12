/**
 * @fileoverview Type definitions for related context functionality.
 *
 * Defines TypeScript interfaces and types for working with related context data
 * in the application, including value objects and data models.
 *
 */

import type { RelatedContextSchema } from './models';

/**
 * Value object for related context data in the application.
 *
 * Provides a flat, simple representation of related context data
 * for use throughout the application components.
 *
 */
export interface RelatedContext {
	id: string;
	title: string;
	type: string;
	isActive: boolean;
	displayName: string;
	$_raw: RelatedContextSchema;
}
