/**
 * Bidding Mutation Hooks
 *
 * React Query hooks for mutating bidding data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { biddingService } from "../bidding.service";
// TODO: Import types
// import type { ... } from "../bidding.api-types";

/**
 * Hook to submit a bid request and receive clearing price + attribution token
 *
 * Automatically invalidates bidding queries on success.
 */
export function useCreateBidRequest() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return biddingService.createBidRequest(data);
    },
    {
      invalidateQueries: [["bidding", "BidRequest"]],
    }
  );
}
