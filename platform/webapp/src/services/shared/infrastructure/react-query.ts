import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from "@tanstack/react-query";
import { getEffectiveOrgId } from "./tenant-state";

export function useTenantQuery<TData>(
  queryKey: QueryKey,
  queryFn: (orgId: string, signal?: AbortSignal) => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">,
) {
  const orgId = getEffectiveOrgId();
  return useQuery({
    queryKey: [...queryKey, orgId],
    queryFn: ({ signal }) => {
      if (!orgId) throw new Error("No organization context");
      return queryFn(orgId, signal);
    },
    enabled: !!orgId && (options?.enabled ?? true),
    ...options,
  });
}

export function useTenantMutation<TData, TVariables>(
  mutationFn: (orgId: string, variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, Error, TVariables>,
) {
  return useMutation({
    mutationFn: (variables: TVariables) => {
      const orgId = getEffectiveOrgId();
      if (!orgId) throw new Error("No organization context");
      return mutationFn(orgId, variables);
    },
    ...options,
  });
}
