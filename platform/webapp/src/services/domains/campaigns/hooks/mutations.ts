/**
 * Campaigns Mutation Hooks
 *
 * React Query hooks for mutating campaigns data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { campaignsService } from "../campaigns.service";
// TODO: Import types
// import type { ... } from "../campaigns.api-types";

/**
 * Hook to create campaign
 *
 * Automatically invalidates campaigns queries on success.
 */
export function useCreateCampaign() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return campaignsService.createCampaign(data);
    },
    {
      invalidateQueries: [["campaigns", "Campaign"]],
    }
  );
}

/**
 * Hook to register a target conversion action for a campaign
 *
 * Automatically invalidates campaigns queries on success.
 */
export function useGetConversionDefinition() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return campaignsService.getConversionDefinition(data);
    },
    {
      invalidateQueries: [["campaigns", "ConversionDefinition"]],
    }
  );
}
