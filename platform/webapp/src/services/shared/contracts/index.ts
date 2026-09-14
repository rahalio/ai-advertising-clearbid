/**
 * Shared webapp contracts helpers (handwritten).
 * Domain Zod re-exports live under services/domains/<domain>/contracts.
 */

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export function validateApiResponse<T>(
  value: unknown,
  _schema?: unknown,
): ApiResponse<T> {
  if (value && typeof value === "object" && "data" in value) {
    return value as ApiResponse<T>;
  }
  return { data: value as T };
}

export function formatValidationError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
