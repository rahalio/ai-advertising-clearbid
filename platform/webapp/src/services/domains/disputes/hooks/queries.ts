/**
 * Disputes Query Hooks
 *
 * React Query hooks for fetching disputes data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { disputesService } from "../disputes.service";

/**
 * Hook to list disputes
 *
 * Query key: ["disputes", "Dispute", ]
 */
export function useDispute(params?: Record<string, any>) {
  return useTenantQuery(
    ["disputes", "Dispute", ],
    async (orgId: string, signal?: AbortSignal) => {
      return disputesService.getDispute(params, signal);
    }
  );
}
