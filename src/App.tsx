
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InvestorsManagement from "./pages/admin/InvestorsManagement";
import PartnersManagement from "./pages/admin/PartnersManagement";
import FinancialManagement from "./pages/admin/FinancialManagement";
import ReportsPage from "./pages/admin/ReportsPage";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerLinks from "./pages/partner/PartnerLinks";
import PartnerCommissions from "./pages/partner/PartnerCommissions";
import AdminLogin from "./pages/admin/AdminLogin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/investors" element={<InvestorsManagement />} />
          <Route path="/admin/partners" element={<PartnersManagement />} />
          <Route path="/admin/financial" element={<FinancialManagement />} />
          <Route path="/admin/reports" element={<ReportsPage />} />
          <Route path="/partner/dashboard" element={<PartnerDashboard />} />
          <Route path="/partner/links" element={<PartnerLinks />} />
          <Route path="/partner/commissions" element={<PartnerCommissions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
