/**
 * Reporting Domain Contracts
 *
 * Re-exports Zod schemas from @clearbid/core for runtime validation.
 * This avoids duplication and ensures alignment with the API contract.
 *
 * Architecture:
 * - Single source of truth: @clearbid/core
 * - No code duplication or drift
 * - Runtime validation of API responses
 * - Used in services to validate responses
 *
 * @see @clearbid/core/reporting for the source schemas
 */

import { reportingSchemas as coreReportingSchemas } from "@clearbid/core/reporting";
import type { z } from "zod";

/**
 * Re-export schemas from core
 * These are the same schemas used by the api-server, ensuring perfect alignment
 */
export const {
  // TODO: Add specific schema exports based on OpenAPI spec
  // ResponseMeta,
  // PageInfo,
  // etc.
} = coreReportingSchemas;

/**
 * Export all schemas as a namespace for convenience
 */
export const reportingSchemas = coreReportingSchemas;
