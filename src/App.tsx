
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ROICalculatorPage from "./pages/ROICalculatorPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import InvestorsManagement from "./pages/admin/InvestorsManagement";
import PartnersManagement from "./pages/admin/PartnersManagement";
import FinancialManagement from "./pages/admin/FinancialManagement";
import ReportsPage from "./pages/admin/ReportsPage";
import PartnerDashboard from "./pages/partner/PartnerDashboard";
import PartnerLinks from "./pages/partner/PartnerLinks";
import PartnerCommissions from "./pages/partner/PartnerCommissions";
import PartnerInvestors from "./pages/partner/PartnerInvestors";
import InvestorRegistration from "./pages/partner/InvestorRegistration";
import AuthPage from "./components/auth/AuthPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ErrorBoundary } from './components/ErrorBoundary';

// Create a stable query client instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/calculadora" element={<ROICalculatorPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/investors" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <InvestorsManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/partners" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <PartnersManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/financial" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <FinancialManagement />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/reports" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <ReportsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/partner/dashboard" 
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PartnerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/partner/investors" 
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PartnerInvestors />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/partner/investors/new" 
                element={
                  <ProtectedRoute requiredRole="partner">
                    <InvestorRegistration />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/partner/links" 
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PartnerLinks />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/partner/commissions" 
                element={
                  <ProtectedRoute requiredRole="partner">
                    <PartnerCommissions />
                  </ProtectedRoute>
                } 
              />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
