/**
 * Inventory Query Hooks
 *
 * React Query hooks for fetching inventory data
 */

import { useTenantQuery } from "@/services/shared/infrastructure";
import { inventoryService } from "../inventory.service";

/**
 * Hook to list inventory slots
 *
 * Query key: ["inventory", "Slot", ]
 */
export function useSlot(params?: Record<string, any>) {
  return useTenantQuery(
    ["inventory", "Slot", ],
    async (orgId: string, signal?: AbortSignal) => {
      return inventoryService.getSlot(params, signal);
    }
  );
}
