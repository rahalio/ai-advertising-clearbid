/**
 * Reporting Domain Facade
 *
 * High-level API for reporting domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { reportingService } from "./reporting.service";
// TODO: Import types
// import type { ... } from "./reporting.api-types";

/**
 * Reporting Facade
 *
 * High-level API for reporting operations.
 * Components should use this facade instead of services directly.
 */
export const reportingFacade = {
  /**
   * Verified CPA versus incumbent benchmark
   */
  async getCostPerAction(...args: Parameters<typeof reportingService.getCostPerAction>): Promise<any> {
    return reportingService.getCostPerAction(...args);
  }
};
