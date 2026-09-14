/**
 * Wraps a domain service object with error logging.
 */
export function makeService<T extends Record<string, unknown>>(
  service: T,
  domainName: string,
): T {
  const wrapped: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(service)) {
    if (typeof value !== "function") {
      wrapped[key] = value;
      continue;
    }
    wrapped[key] = async (...args: unknown[]) => {
      try {
        return await (value as (...a: unknown[]) => unknown).apply(service, args);
      } catch (error) {
        console.error(`[${domainName}.${key}]`, error);
        throw error;
      }
    };
  }
  return wrapped as T;
}
