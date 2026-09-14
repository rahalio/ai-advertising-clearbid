/**
 * Settlement Mutation Hooks
 *
 * React Query hooks for mutating settlement data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { settlementService } from "../settlement.service";
// TODO: Import types
// import type { ... } from "../settlement.api-types";

/**
 * Hook to execute publisher payout against a statement
 *
 * Automatically invalidates settlement queries on success.
 */
export function useCreatePayout() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return settlementService.createPayout(data);
    },
    {
      invalidateQueries: [["settlement", "Payout"]],
    }
  );
}
