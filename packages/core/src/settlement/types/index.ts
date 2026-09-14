/**
 * Settlement Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/settlement.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CounterpartyType = components["schemas"]["CounterpartyType"];
export type Payout = components["schemas"]["Payout"];
export type PayoutId = components["schemas"]["PayoutId"];
export type PayoutStatus = components["schemas"]["PayoutStatus"];
export type SettlementStatement = components["schemas"]["SettlementStatement"];
export type StatementId = components["schemas"]["StatementId"];
export type StatementListData = components["schemas"]["StatementListData"];
export type PayoutRequest = components["schemas"]["PayoutRequest"];
export type Statement = operations["listSettlementStatements"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ExecutePublisherPayoutRequestInput = NonNullable<operations["executePublisherPayout"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListSettlementStatementsParams = NonNullable<operations["listSettlementStatements"]["parameters"]["query"]>;
export type GetSettlementStatementParams = operations["getSettlementStatement"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSettlementStatementsResponse = operations["listSettlementStatements"]["responses"]["200"]["content"]["application/json"];
export type GetSettlementStatementResponse = operations["getSettlementStatement"]["responses"]["200"]["content"]["application/json"];
export type ExecutePublisherPayoutResponse = operations["executePublisherPayout"]["responses"]["201"]["content"]["application/json"];


