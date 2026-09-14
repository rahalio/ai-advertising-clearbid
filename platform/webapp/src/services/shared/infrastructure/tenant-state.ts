const ORG_KEY = "clearbid.orgId";
const TOKEN_KEY = "clearbid.accessToken";
const ROLE_KEY = "clearbid.consoleRole";

export type ConsoleRole = "advertiser" | "publisher" | "operator";

let memoryOrgId: string | null =
  (typeof localStorage !== "undefined" && localStorage.getItem(ORG_KEY)) ||
  import.meta.env.VITE_DEMO_ORG_ID ||
  "tnt_demo";

let memoryToken: string | null =
  (typeof localStorage !== "undefined" && localStorage.getItem(TOKEN_KEY)) ||
  null;

let memoryRole: ConsoleRole =
  ((typeof localStorage !== "undefined" &&
    localStorage.getItem(ROLE_KEY)) as ConsoleRole) || "advertiser";

export function getEffectiveOrgId(): string | null {
  return memoryOrgId;
}

export function setEffectiveOrgId(orgId: string | null): void {
  memoryOrgId = orgId;
  if (typeof localStorage === "undefined") return;
  if (orgId) localStorage.setItem(ORG_KEY, orgId);
  else localStorage.removeItem(ORG_KEY);
}

export function getAccessToken(): string | null {
  return memoryToken;
}

export function setAccessToken(token: string | null): void {
  memoryToken = token;
  if (typeof localStorage === "undefined") return;
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
}

export function getConsoleRole(): ConsoleRole {
  return memoryRole;
}

export function setConsoleRole(role: ConsoleRole): void {
  memoryRole = role;
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(ROLE_KEY, role);
}
