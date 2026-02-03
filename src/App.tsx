import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PaymentPage from "./pages/PaymentPage";
import CardPaymentPage from "./pages/payment/CardPaymentPage";
import BankTransferPage from "./pages/payment/BankTransferPage";
import MobileMoneyPage from "./pages/payment/MobileMoneyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";
import LandBuyingPage from "./pages/LandBuyingPage";
import LandSellingPage from "./pages/LandSellingPage";
import PropertyValuationPage from "./pages/PropertyValuationPage";
import LegalConsultationPage from "./pages/LegalConsultationPage";
import AdminPage from "./pages/AdminPage";
import VIPAdminPage from "./pages/VIPAdminPage";
import VIPLoginPage from "./pages/VIPLoginPage";
import AdminDashboard from "./components/admin/AdminDashboard";
import PropertyManagementPage from "./components/admin/PropertyManagementPage";
import AddPropertyPage from "./components/admin/AddPropertyPage";
import EditPropertyPage from "./components/admin/EditPropertyPage";
import UserManagementPage from "./components/admin/UserManagementPage";
import AdminProfilePage from "./components/admin/AdminProfilePage";
import MessagesPage from "./components/admin/MessagesPage";

const App = () => {
  // Create a new QueryClient instance inside the function component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/properties" element={<PropertiesPage />} />
                <Route path="/properties/:id" element={<PropertyDetailPage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/payment/card" element={<CardPaymentPage />} />
                <Route path="/payment/bank-transfer" element={<BankTransferPage />} />
                <Route path="/payment/mobile-money" element={<MobileMoneyPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/land-buying" element={<LandBuyingPage />} />
                <Route path="/land-selling" element={<LandSellingPage />} />
                <Route path="/property-valuation" element={<PropertyValuationPage />} />
                <Route path="/legal-consultation" element={<LegalConsultationPage />} />
                <Route path="/vip-login" element={<VIPLoginPage />} />

                {/* Protected User Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />

                {/* Protected Admin Routes */}
                <Route path="/admin" element={<AdminPage />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="properties" element={<PropertyManagementPage />} />
                  <Route path="properties/add" element={<AddPropertyPage />} />
                  <Route path="properties/edit/:id" element={<EditPropertyPage />} />
                  <Route path="users" element={<UserManagementPage />} />
                  <Route path="profile" element={<AdminProfilePage />} />
                  <Route path="messages" element={<MessagesPage />} />
                </Route>
                
                <Route path="/vip-admin" element={
                  <ProtectedRoute requireAdmin>
                    <VIPAdminPage />
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
