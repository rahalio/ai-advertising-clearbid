/**
 * Settlement Domain Facade
 *
 * High-level API for settlement domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { settlementService } from "./settlement.service";
// TODO: Import types
// import type { ... } from "./settlement.api-types";

/**
 * Settlement Facade
 *
 * High-level API for settlement operations.
 * Components should use this facade instead of services directly.
 */
export const settlementFacade = {
  /**
   * List settlement statements
   */
  async getStatement(...args: Parameters<typeof settlementService.getStatement>): Promise<any> {
    return settlementService.getStatement(...args);
  },

  /**
   * Get a settlement statement
   */
  async getStatement(...args: Parameters<typeof settlementService.getStatement>): Promise<any> {
    return settlementService.getStatement(...args);
  },

  /**
   * Execute publisher payout against a statement
   */
  async createPayout(...args: Parameters<typeof settlementService.createPayout>): Promise<any> {
    return settlementService.createPayout(...args);
  }
};
