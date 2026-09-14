/**
 * Conversions Domain Facade
 *
 * High-level API for conversions domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { conversionsService } from "./conversions.service";
// TODO: Import types
// import type { ... } from "./conversions.api-types";

/**
 * Conversions Facade
 *
 * High-level API for conversions operations.
 * Components should use this facade instead of services directly.
 */
export const conversionsFacade = {
  /**
   * List conversion records
   */
  async getConversion(...args: Parameters<typeof conversionsService.getConversion>): Promise<any> {
    return conversionsService.getConversion(...args);
  },

  /**
   * Attest a conversion against a signed attribution token
   */
  async getConversion(...args: Parameters<typeof conversionsService.getConversion>): Promise<any> {
    return conversionsService.getConversion(...args);
  },

  /**
   * Get hash-chained ledger proof for a conversion
   */
  async getVerification(...args: Parameters<typeof conversionsService.getVerification>): Promise<any> {
    return conversionsService.getVerification(...args);
  }
};
