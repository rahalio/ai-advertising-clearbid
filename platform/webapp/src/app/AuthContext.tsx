import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { apiClient } from "@/services/shared/infrastructure/api-client";
import {
  getAccessToken,
  getConsoleRole,
  setAccessToken,
  setConsoleRole,
  setEffectiveOrgId,
  type ConsoleRole,
} from "@/services/shared/infrastructure/tenant-state";

type AuthState = {
  token: string | null;
  role: ConsoleRole;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setRole: (role: ConsoleRole) => void;
};

const AuthContext = createContext<AuthState | null>(null);

type LoginResponse = {
  data?: {
    accessToken?: string;
    token?: string;
    user?: { email?: string; orgId?: string };
  };
  accessToken?: string;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getAccessToken());
  const [role, setRoleState] = useState<ConsoleRole>(getConsoleRole());
  const [email, setEmail] = useState<string | null>(null);

  const login = useCallback(async (emailInput: string, password: string) => {
    const result = await apiClient.post<LoginResponse>("/v0/auth/login", {
      email: emailInput,
      password,
    });
    const access =
      result.data?.accessToken ?? result.data?.token ?? result.accessToken ?? null;
    if (!access) {
      // Sandbox fallback for local demos when auth stub shape differs
      setAccessToken("demo-operator-token");
      setToken("demo-operator-token");
    } else {
      setAccessToken(access);
      setToken(access);
    }
    const orgId = result.data?.user?.orgId;
    if (orgId) setEffectiveOrgId(orgId);
    setEmail(result.data?.user?.email ?? emailInput);
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/v0/auth/logout", {});
    } catch {
      // ignore offline logout
    }
    setAccessToken(null);
    setToken(null);
    setEmail(null);
  }, []);

  const setRole = useCallback((next: ConsoleRole) => {
    setConsoleRole(next);
    setRoleState(next);
  }, []);

  const value = useMemo(
    () => ({ token, role, email, login, logout, setRole }),
    [token, role, email, login, logout, setRole],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
