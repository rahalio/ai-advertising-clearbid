/**
 * Inventory Mutation Hooks
 *
 * React Query hooks for mutating inventory data
 */

import { useTenantMutation } from "@/services/shared/infrastructure";
import { inventoryService } from "../inventory.service";
// TODO: Import types
// import type { ... } from "../inventory.api-types";

/**
 * Hook to register an inventory slot
 *
 * Automatically invalidates inventory queries on success.
 */
export function useCreateSlot() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return inventoryService.createSlot(data);
    },
    {
      invalidateQueries: [["inventory", "Slot"]],
    }
  );
}

/**
 * Hook to quarantine a slot after ivt threshold breach
 *
 * Automatically invalidates inventory queries on success.
 */
export function useGetQuarantine() {
  return useTenantMutation(
    async (orgId: string, data: any) => {
      return inventoryService.getQuarantine(data);
    },
    {
      invalidateQueries: [["inventory", "Quarantine"]],
    }
  );
}
