/**
 * Disputes Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/disputes.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type Dispute = components["schemas"]["Dispute"];
export type DisputeClaim = components["schemas"]["DisputeClaim"];
export type DisputeCreate = components["schemas"]["DisputeCreate"];
export type DisputeId = components["schemas"]["DisputeId"];
export type DisputeListData = components["schemas"]["DisputeListData"];
export type DisputeOutcome = components["schemas"]["DisputeOutcome"];
export type DisputeResolution = components["schemas"]["DisputeResolution"];
export type DisputeStatus = components["schemas"]["DisputeStatus"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenDisputeRequestInput = NonNullable<operations["openDispute"]["requestBody"]>["content"]["application/json"];
export type ResolveDisputeRequestInput = NonNullable<operations["resolveDispute"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListDisputesParams = NonNullable<operations["listDisputes"]["parameters"]["query"]>;
export type ResolveDisputeParams = operations["resolveDispute"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListDisputesResponse = operations["listDisputes"]["responses"]["200"]["content"]["application/json"];
export type OpenDisputeResponse = operations["openDispute"]["responses"]["201"]["content"]["application/json"];
export type ResolveDisputeResponse = operations["resolveDispute"]["responses"]["200"]["content"]["application/json"];


