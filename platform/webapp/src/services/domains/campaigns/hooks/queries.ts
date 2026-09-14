/**
 * Campaigns Query Hooks
 *
 * React Query hooks for fetching campaigns data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { campaignsService } from "../campaigns.service";

/**
 * Hook to list campaigns
 *
 * Query key: ["campaigns", "Campaign", ]
 */
export function useCampaign(params?: Record<string, any>) {
  return useTenantQuery(
    ["campaigns", "Campaign", ],
    async (orgId: string, signal?: AbortSignal) => {
      return campaignsService.getCampaign(params, signal);
    }
  );
}

/**
 * Hook to get campaign
 *
 * Query key: ["campaigns", "Campaign", campaignId]
 */
export function useCampaign(campaignId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["campaigns", "Campaign", campaignId],
    async (orgId: string, signal?: AbortSignal) => {
      return campaignsService.getCampaign(campaignId, params, signal);
    },
    {
      enabled: !!campaignId
    }
  );
}
