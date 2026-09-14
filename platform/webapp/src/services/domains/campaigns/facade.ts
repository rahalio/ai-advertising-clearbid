/**
 * Campaigns Domain Facade
 *
 * High-level API for campaigns domain operations.
 * Provides simplified interface for components.
 *
 * Architecture:
 * - Facade pattern for domain operations
 * - Components should use facades, not services directly
 * - Hides complexity of domain orchestration
 */

import { campaignsService } from "./campaigns.service";
// TODO: Import types
// import type { ... } from "./campaigns.api-types";

/**
 * Campaigns Facade
 *
 * High-level API for campaigns operations.
 * Components should use this facade instead of services directly.
 */
export const campaignsFacade = {
  /**
   * List campaigns
   */
  async getCampaign(...args: Parameters<typeof campaignsService.getCampaign>): Promise<any> {
    return campaignsService.getCampaign(...args);
  },

  /**
   * Create campaign
   */
  async createCampaign(...args: Parameters<typeof campaignsService.createCampaign>): Promise<any> {
    return campaignsService.createCampaign(...args);
  },

  /**
   * Get campaign
   */
  async getCampaign(...args: Parameters<typeof campaignsService.getCampaign>): Promise<any> {
    return campaignsService.getCampaign(...args);
  },

  /**
   * Register a target conversion action for a campaign
   */
  async getConversionDefinition(...args: Parameters<typeof campaignsService.getConversionDefinition>): Promise<any> {
    return campaignsService.getConversionDefinition(...args);
  }
};
