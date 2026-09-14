/**
 * Bidding Domain Facade
 *
 * High-level API for bidding domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { biddingService } from "./bidding.service";
// TODO: Import types
// import type { ... } from "./bidding.api-types";

/**
 * Bidding Facade
 *
 * High-level API for bidding operations.
 * Components should use this facade instead of services directly.
 */
export const biddingFacade = {
  /**
   * Submit a bid request and receive clearing price + attribution token
   */
  async createBidRequest(...args: Parameters<typeof biddingService.createBidRequest>): Promise<any> {
    return biddingService.createBidRequest(...args);
  },

  /**
   * Forecast achievable actions and CPA before budget commit
   */
  async getActionForecast(...args: Parameters<typeof biddingService.getActionForecast>): Promise<any> {
    return biddingService.getActionForecast(...args);
  }
};
