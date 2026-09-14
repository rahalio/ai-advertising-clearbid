/**
 * Reporting Query Hooks
 *
 * React Query hooks for fetching reporting data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { reportingService } from "../reporting.service";

/**
 * Hook to verified cpa versus incumbent benchmark
 *
 * Query key: ["reporting", "CostPerAction", ]
 */
export function useCostPerAction(params?: Record<string, any>) {
  return useTenantQuery(
    ["reporting", "CostPerAction", ],
    async (orgId: string, signal?: AbortSignal) => {
      return reportingService.getCostPerAction(params, signal);
    }
  );
}
