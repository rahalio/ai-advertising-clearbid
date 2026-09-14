/**
 * Inventory Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/inventory.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type InventoryFormat = components["schemas"]["InventoryFormat"];
export type InventorySlot = components["schemas"]["InventorySlot"];
export type InventorySlotCreate = components["schemas"]["InventorySlotCreate"];
export type InventorySlotListData = components["schemas"]["InventorySlotListData"];
export type InventorySlotStatus = components["schemas"]["InventorySlotStatus"];
export type SlotId = components["schemas"]["SlotId"];
export type QuarantineRequest = components["schemas"]["QuarantineRequest"];
export type Slot = operations["listInventorySlots"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RegisterInventorySlotRequestInput = NonNullable<operations["registerInventorySlot"]["requestBody"]>["content"]["application/json"];
export type QuarantineInventorySlotRequestInput = NonNullable<operations["quarantineInventorySlot"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListInventorySlotsParams = NonNullable<operations["listInventorySlots"]["parameters"]["query"]>;
export type QuarantineInventorySlotParams = operations["quarantineInventorySlot"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListInventorySlotsResponse = operations["listInventorySlots"]["responses"]["200"]["content"]["application/json"];
export type RegisterInventorySlotResponse = operations["registerInventorySlot"]["responses"]["201"]["content"]["application/json"];
export type QuarantineInventorySlotResponse = operations["quarantineInventorySlot"]["responses"]["200"]["content"]["application/json"];


