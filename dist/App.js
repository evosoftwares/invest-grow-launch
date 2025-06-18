import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const App = () => (_jsx(ErrorBoundary, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(AuthProvider, { children: _jsxs(TooltipProvider, { children: [_jsx(Toaster, {}), _jsx(Sonner, {}), _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Index, {}) }), _jsx(Route, { path: "/calculadora", element: _jsx(ROICalculatorPage, {}) }), _jsx(Route, { path: "/como-funciona", element: _jsx(HowItWorksPage, {}) }), _jsx(Route, { path: "/auth", element: _jsx(AuthPage, {}) }), _jsx(Route, { path: "/mobile/login", element: _jsx(MobileLogin, {}) }), _jsx(Route, { path: "/mobile/partner-profile", element: _jsx(PartnerProfile, {}) }), _jsx(Route, { path: "/mobile/partner-dashboard", element: _jsx(PartnerDashboardMobile, {}) }), _jsx(Route, { path: "/mobile/feed-opportunities", element: _jsx(FeedOpportunities, {}) }), _jsx(Route, { path: "/mobile/mission-details/:id", element: _jsx(MissionDetails, {}) }), _jsx(Route, { path: "/mobile/mission-execution/:id", element: _jsx(MissionExecution, {}) }), _jsx(Route, { path: "/mobile/wallet", element: _jsx(Wallet, {}) }), _jsx(Route, { path: "/mobile/rewards-club", element: _jsx(RewardsClub, {}) }), _jsx(Route, { path: "/mobile/client-dashboard", element: _jsx(ClientDashboard, {}) }), _jsx(Route, { path: "/mobile/publish-mission", element: _jsx(PublishMission, {}) }), _jsx(Route, { path: "/mobile/task-approval", element: _jsx(TaskApproval, {}) }), _jsx(Route, { path: "/mobile/client-finance", element: _jsx(ClientFinance, {}) }), _jsx(Route, { path: "/mobile/ride-request", element: _jsx(RideRequest, {}) }), _jsx(Route, { path: "/mobile/ride-progress", element: _jsx(RideProgress, {}) }), _jsx(Route, { path: "/admin/dashboard", element: _jsx(ProtectedRoute, { requiredRole: "admin", children: _jsx(AdminDashboard, {}) }) }), _jsx(Route, { path: "/admin/investors", element: _jsx(ProtectedRoute, { requiredRole: "admin", children: _jsx(InvestorsManagement, {}) }) }), _jsx(Route, { path: "/admin/partners", element: _jsx(ProtectedRoute, { requiredRole: "admin", children: _jsx(PartnersManagement, {}) }) }), _jsx(Route, { path: "/admin/financial", element: _jsx(ProtectedRoute, { requiredRole: "admin", children: _jsx(FinancialManagement, {}) }) }), _jsx(Route, { path: "/admin/reports", element: _jsx(ProtectedRoute, { requiredRole: "admin", children: _jsx(ReportsPage, {}) }) }), _jsx(Route, { path: "/partner/dashboard", element: _jsx(ProtectedRoute, { requiredRole: "partner", children: _jsx(PartnerDashboard, {}) }) }), _jsx(Route, { path: "/partner/investors", element: _jsx(ProtectedRoute, { requiredRole: "partner", children: _jsx(PartnerInvestors, {}) }) }), _jsx(Route, { path: "/partner/investors/new", element: _jsx(ProtectedRoute, { requiredRole: "partner", children: _jsx(InvestorRegistration, {}) }) }), _jsx(Route, { path: "/partner/links", element: _jsx(ProtectedRoute, { requiredRole: "partner", children: _jsx(PartnerLinks, {}) }) }), _jsx(Route, { path: "/partner/commissions", element: _jsx(ProtectedRoute, { requiredRole: "partner", children: _jsx(PartnerCommissions, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) })] }) }) }) }));
export default App;
