import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./AppShell";
import { LoginPage } from "./LoginPage";
import { CampaignsView } from "@/features/campaigns/views";
import { InventoryView } from "@/features/inventory/views";
import { BiddingView } from "@/features/bidding/views";
import { ConversionsView } from "@/features/conversions/views";
import { SettlementView } from "@/features/settlement/views";
import { DisputesView } from "@/features/disputes/views";
import { ReportingView } from "@/features/reporting/views";
import { IdentityView } from "@/features/identity/views";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/campaigns" replace />} />
        <Route path="/campaigns" element={<CampaignsView />} />
        <Route path="/inventory" element={<InventoryView />} />
        <Route path="/bidding" element={<BiddingView />} />
        <Route path="/conversions" element={<ConversionsView />} />
        <Route path="/settlement" element={<SettlementView />} />
        <Route path="/disputes" element={<DisputesView />} />
        <Route path="/reporting" element={<ReportingView />} />
        <Route path="/identity" element={<IdentityView />} />
      </Route>
      <Route path="*" element={<Navigate to="/campaigns" replace />} />
    </Routes>
  );
}
