
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthGuard from "./components/AuthGuard";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Public Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import KnowledgeBase from "./pages/KnowledgeBase";
import NotFound from "./pages/NotFound";

// User Pages
import UserDashboard from "./pages/UserDashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetailPage from "./pages/TicketDetailPage";

// Agent Pages
import AgentDashboard from "./pages/AgentDashboard";
import AgentTicketView from "./pages/AgentTicketView";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          
          {/* Protected User Routes */}
          <Route 
            path="/dashboard" 
            element={
              <AuthGuard requiredRole="user">
                <UserDashboard />
              </AuthGuard>
            } 
          />
          <Route 
            path="/create-ticket" 
            element={
              <AuthGuard requiredRole="user">
                <CreateTicket />
              </AuthGuard>
            } 
          />
          <Route 
            path="/ticket/:ticketId" 
            element={
              <AuthGuard requiredRole="user">
                <TicketDetailPage />
              </AuthGuard>
            } 
          />
          
          {/* Protected Agent Routes */}
          <Route 
            path="/agent-dashboard" 
            element={
              <AuthGuard requiredRole="agent">
                <AgentDashboard />
              </AuthGuard>
            } 
          />
          <Route 
            path="/agent/ticket/:ticketId" 
            element={
              <AuthGuard requiredRole="agent">
                <AgentTicketView />
              </AuthGuard>
            } 
          />
          
          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <AuthGuard requiredRole="admin">
                <AdminDashboard />
              </AuthGuard>
            } 
          />
          
          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
