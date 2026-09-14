/**
 * Conversions Mutation Hooks
 *
 * React Query hooks for mutating conversions data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { conversionsService } from "../conversions.service";
// TODO: Import types
// import type { ... } from "../conversions.api-types";

/**
 * Hook to attest a conversion against a signed attribution token
 *
 * Automatically invalidates conversions queries on success.
 */
export function useGetConversion() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return conversionsService.getConversion(data);
    },
    {
      invalidateQueries: [["conversions", "Conversion"]],
    }
  );
}
