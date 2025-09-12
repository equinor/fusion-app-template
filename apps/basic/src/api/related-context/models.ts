/**
 * @fileoverview Data models and schemas for related context API.
 *
 * Defines TypeScript interfaces and schemas for the related context API
 * including DTOs, value schemas, and type guards.
 *
 */

// DTO Types for Related Context API
export interface RelatedContextTypeSchema {
	id: string;
	isChildType: boolean;
	parentTypeIds: string[];
}

export interface OrganizationalUnitValueSchema {
	sapId: string;
	shortName: string;
	department: string;
	fullDepartment: string;
	type: string;
	isPortfolio: boolean;
}

export interface EquinorTaskValueSchema {
	taskName: string;
	taskState: string;
	orgChartId: string;
	orgUnitSapId: string;
	orgUnitShortName: string;
	orgUnitName: string;
	orgUnitDepartment: string;
	orgUnitFullDepartment: string;
	orgUnitType: string;
}

export interface OrgChartEquinorTaskValueSchema {
	orgChartId: string;
	domainId: string | null;
	dgPhase: string;
	state: string;
	keywords: string[];
}

export type RelatedContextValueSchema =
	| OrganizationalUnitValueSchema
	| EquinorTaskValueSchema
	| OrgChartEquinorTaskValueSchema;

export interface RelatedContextSchema<
	TValue extends RelatedContextValueSchema = RelatedContextValueSchema,
> {
	relationSource: string;
	relationType: string | null;
	id: string;
	externalId: string;
	source: string | null;
	type: RelatedContextTypeSchema;
	value: TValue;
	title: string;
	isActive: boolean;
	isDeleted: boolean;
	created: string;
	updated: string | null;
}

export const isOrganizationalUnitValueSchema = (
	value: RelatedContextSchema,
): value is RelatedContextSchema<OrganizationalUnitValueSchema> => {
	return value.type.id === 'OrganizationalUnit';
};

export const isEquinorTaskValueSchema = (
	value: RelatedContextSchema,
): value is RelatedContextSchema<EquinorTaskValueSchema> => {
	return value.type.id === 'EquinorTask';
};

export const isOrgChartValueSchema = (
	value: RelatedContextSchema,
): value is RelatedContextSchema<OrgChartEquinorTaskValueSchema> => {
	return value.type.id === 'OrgChart';
};

export type RelatedContextsResponse = RelatedContextSchema[];
