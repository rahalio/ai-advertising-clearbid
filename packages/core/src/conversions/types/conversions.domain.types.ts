/**
 * Conversions Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/conversions.openapi.types";

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
export type ConversionAttestation = components["schemas"]["ConversionAttestation"];
export type ConversionId = components["schemas"]["ConversionId"];
export type ConversionListData = components["schemas"]["ConversionListData"];
export type ConversionRecord = components["schemas"]["ConversionRecord"];
export type ConversionStatus = components["schemas"]["ConversionStatus"];
export type LedgerProof = components["schemas"]["LedgerProof"];
export type Conversion = operations["listConversions"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type AttestConversionRequestInput = NonNullable<operations["attestConversion"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListConversionsParams = NonNullable<operations["listConversions"]["parameters"]["query"]>;
export type GetConversionVerificationParams = operations["getConversionVerification"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListConversionsResponse = operations["listConversions"]["responses"]["200"]["content"]["application/json"];
export type AttestConversionResponse = operations["attestConversion"]["responses"]["201"]["content"]["application/json"];
export type GetConversionVerificationResponse = operations["getConversionVerification"]["responses"]["200"]["content"]["application/json"];


