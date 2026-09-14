import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { ConsoleRole } from "@/services/shared/infrastructure";

type NavItem = { to: string; label: string; roles: ConsoleRole[] };

const NAV: NavItem[] = [
  { to: "/campaigns", label: "Campaigns", roles: ["advertiser", "operator"] },
  { to: "/bidding", label: "Bidding", roles: ["advertiser", "operator"] },
  { to: "/reporting", label: "Reporting", roles: ["advertiser", "publisher", "operator"] },
  { to: "/inventory", label: "Inventory", roles: ["publisher", "operator"] },
  { to: "/conversions", label: "Conversions", roles: ["advertiser", "publisher", "operator"] },
  { to: "/settlement", label: "Settlement", roles: ["advertiser", "publisher", "operator"] },
  { to: "/disputes", label: "Disputes", roles: ["advertiser", "publisher", "operator"] },
  { to: "/identity", label: "Identity", roles: ["operator"] },
];

const ROLES: ConsoleRole[] = ["advertiser", "publisher", "operator"];

export function AppShell() {
  const { role, setRole, email, logout, token } = useAuth();
  const items = NAV.filter((item) => item.roles.includes(role));

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">Clearbid</span>
          <span className="brand-sub">Settlement exchange</span>
        </div>
        <nav className="nav">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <label className="role-label" htmlFor="console-role">
            Console role
          </label>
          <select
            id="console-role"
            className="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value as ConsoleRole)}
          >
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <div className="session-meta">
            <span>{email ?? (token ? "Signed in" : "API key mode")}</span>
            <button type="button" className="linkish" onClick={() => void logout()}>
              Sign out
            </button>
          </div>
        </div>
      </aside>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
