
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ROICalculatorPage from "./pages/ROICalculatorPage";
import HowItWorksPage from "./pages/HowItWorksPage";
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

// Mobile Pages
import MobileLogin from "./pages/mobile/MobileLogin";
import PartnerProfile from "./pages/mobile/PartnerProfile";
import PartnerDashboardMobile from "./pages/mobile/PartnerDashboard";
import FeedOpportunities from "./pages/mobile/FeedOpportunities";
import MissionDetails from "./pages/mobile/MissionDetails";
import MissionExecution from "./pages/mobile/MissionExecution";
import Wallet from "./pages/mobile/Wallet";
import RewardsClub from "./pages/mobile/RewardsClub";
import ClientDashboard from "./pages/mobile/ClientDashboard";
import PublishMission from "./pages/mobile/PublishMission";
import TaskApproval from "./pages/mobile/TaskApproval";
import ClientFinance from "./pages/mobile/ClientFinance";
import RideRequest from "./pages/mobile/RideRequest";
import RideProgress from "./pages/mobile/RideProgress";

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
              <Route path="/como-funciona" element={<HowItWorksPage />} />
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Mobile Routes */}
              <Route path="/mobile/login" element={<MobileLogin />} />
              <Route path="/mobile/partner-profile" element={<PartnerProfile />} />
              <Route path="/mobile/partner-dashboard" element={<PartnerDashboardMobile />} />
              <Route path="/mobile/feed-opportunities" element={<FeedOpportunities />} />
              <Route path="/mobile/mission-details/:id" element={<MissionDetails />} />
              <Route path="/mobile/mission-execution/:id" element={<MissionExecution />} />
              <Route path="/mobile/wallet" element={<Wallet />} />
              <Route path="/mobile/rewards-club" element={<RewardsClub />} />
              
              {/* Client Mobile Routes */}
              <Route path="/mobile/client-dashboard" element={<ClientDashboard />} />
              <Route path="/mobile/publish-mission" element={<PublishMission />} />
              <Route path="/mobile/task-approval" element={<TaskApproval />} />
              <Route path="/mobile/client-finance" element={<ClientFinance />} />
              <Route path="/mobile/ride-request" element={<RideRequest />} />
              <Route path="/mobile/ride-progress" element={<RideProgress />} />
              
              {/* Admin Routes */}
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
              
              {/* Partner Routes */}
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
              
              {/* Catch-all route MUST be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
