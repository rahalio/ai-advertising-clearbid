/**
 * Settlement Query Hooks
 *
 * React Query hooks for fetching settlement data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { settlementService } from "../settlement.service";

/**
 * Hook to list settlement statements
 *
 * Query key: ["settlement", "Statement", ]
 */
export function useStatement(params?: Record<string, any>) {
  return useTenantQuery(
    ["settlement", "Statement", ],
    async (orgId: string, signal?: AbortSignal) => {
      return settlementService.getStatement(params, signal);
    }
  );
}

/**
 * Hook to get a settlement statement
 *
 * Query key: ["settlement", "Statement", statementId]
 */
export function useStatement(statementId: string, params?: Record<string, any>) {
  return useTenantQuery(
    ["settlement", "Statement", statementId],
    async (orgId: string, signal?: AbortSignal) => {
      return settlementService.getStatement(statementId, params, signal);
    },
    {
      enabled: !!statementId
    }
  );
}
