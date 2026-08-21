// src/App.jsx
// Router shell — all it does is define routes and wrap with providers.
// The actual calculator lives in PTUCGPACalculator.jsx (Phase 0 bridge)
// and will be split into components/Calculator/ in Phase 1.

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider, useAuth } from './context/AuthContext';

import HomePage     from './pages/HomePage';
import AuthPage     from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage  from './pages/ProfilePage';
import BlogPage     from './pages/BlogPage';
import CalculatorPage from './pages/CalculatorPage';

// Protected route — redirects to /auth if not logged in
function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  if (loading) return null; // Don't flash redirect during initial auth check
  if (!isLoggedIn) return <Navigate to="/auth" replace />;
  return children;
}

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/"           element={<HomePage />} />
            <Route path="/auth"       element={<AuthPage />} />
            <Route path="/blog/:slug" element={<BlogPage />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calculator"
              element={
                <ProtectedRoute>
                  <CalculatorPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all — redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}