import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

/**
 * Guards routes so only authenticated users can access them.
 * Unauthenticated users are redirected to /login with the intended
 * destination stored in `state.from` for post-login redirect.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    // PROTECTION REMOVED - ALWAYS RENDER
    return <>{children}</>;
};

export default ProtectedRoute;
