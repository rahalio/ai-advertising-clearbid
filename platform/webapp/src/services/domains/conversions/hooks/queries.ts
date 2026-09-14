/**
 * Conversions Query Hooks
 *
 * React Query hooks for fetching conversions data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { conversionsService } from "../conversions.service";

/**
 * Hook to list conversion records
 *
 * Query key: ["conversions", "Conversion", ]
 */
export function useConversion(params?: Record<string, any>) {
  return useTenantQuery(
    ["conversions", "Conversion", ],
    async (orgId: string, signal?: AbortSignal) => {
      return conversionsService.getConversion(params, signal);
    }
  );
}

/**
 * Hook to get hash-chained ledger proof for a conversion
 *
 * Query key: ["conversions", "Verification", conversionId]
 */
export function useVerification(conversionId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["conversions", "Verification", conversionId],
    async (orgId: string, signal?: AbortSignal) => {
      return conversionsService.getVerification(conversionId, params, signal);
    },
    {
      enabled: !!conversionId
    }
  );
}
