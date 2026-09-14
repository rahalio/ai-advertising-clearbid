/**
 * Disputes Mutation Hooks
 *
 * React Query hooks for mutating disputes data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { disputesService } from "../disputes.service";
// TODO: Import types
// import type { ... } from "../disputes.api-types";

/**
 * Hook to open a dispute against a conversion record
 *
 * Automatically invalidates disputes queries on success.
 */
export function useGetDispute() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return disputesService.getDispute(data);
    },
    {
      invalidateQueries: [["disputes", "Dispute"]],
    }
  );
}

/**
 * Hook to resolve a dispute within the time-box
 *
 * Automatically invalidates disputes queries on success.
 */
export function useGetResolution() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return disputesService.getResolution(data);
    },
    {
      invalidateQueries: [["disputes", "Resolution"]],
    }
  );
}
