/**
 * Campaigns Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/campaigns.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ActionType = components["schemas"]["ActionType"];
export type AdvertiserCreditRating = components["schemas"]["AdvertiserCreditRating"];
export type Campaign = components["schemas"]["Campaign"];
export type CampaignCreate = components["schemas"]["CampaignCreate"];
export type CampaignId = components["schemas"]["CampaignId"];
export type CampaignListData = components["schemas"]["CampaignListData"];
export type CampaignStatus = components["schemas"]["CampaignStatus"];
export type ConsentBasis = components["schemas"]["ConsentBasis"];
export type ConversionDefinition = components["schemas"]["ConversionDefinition"];
export type ConversionDefinitionId = components["schemas"]["ConversionDefinitionId"];
export type PricingModel = components["schemas"]["PricingModel"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCampaignRequestInput = NonNullable<operations["createCampaign"]["requestBody"]>["content"]["application/json"];
export type DefineConversionActionRequestInput = NonNullable<operations["defineConversionAction"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListCampaignsParams = NonNullable<operations["listCampaigns"]["parameters"]["query"]>;
export type GetCampaignParams = operations["getCampaign"]["parameters"]["path"];
export type DefineConversionActionParams = operations["defineConversionAction"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCampaignsResponse = operations["listCampaigns"]["responses"]["200"]["content"]["application/json"];
export type CreateCampaignResponse = operations["createCampaign"]["responses"]["201"]["content"]["application/json"];
export type GetCampaignResponse = operations["getCampaign"]["responses"]["200"]["content"]["application/json"];
export type DefineConversionActionResponse = operations["defineConversionAction"]["responses"]["201"]["content"]["application/json"];


