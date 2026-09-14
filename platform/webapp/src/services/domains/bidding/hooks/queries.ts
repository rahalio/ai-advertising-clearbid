/**
 * Bidding Query Hooks
 *
 * React Query hooks for fetching bidding data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { biddingService } from "../bidding.service";

/**
 * Hook to forecast achievable actions and cpa before budget commit
 *
 * Query key: ["bidding", "ActionForecast", campaignId]
 */
export function useActionForecast(campaignId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["bidding", "ActionForecast", campaignId],
    async (orgId: string, signal?: AbortSignal) => {
      return biddingService.getActionForecast(campaignId, params, signal);
    },
    {
      enabled: !!campaignId
    }
  );
}
