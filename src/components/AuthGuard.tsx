
import { Navigate } from "react-router-dom";
import { isLoggedIn, getCurrentUser, hasRole } from "@/lib/auth";
import { UserRole } from "@/lib/types";

interface AuthGuardProps {
  children: JSX.Element;
  requiredRole?: UserRole;
}

export const AuthGuard = ({ children, requiredRole }: AuthGuardProps) => {
  const loggedIn = isLoggedIn();
  
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  
  // If specific role is required, check that too
  if (requiredRole) {
    const roleMatches = hasRole(requiredRole);
    
    if (!roleMatches) {
      // Redirect based on user's actual role
      const user = getCurrentUser();
      
      if (user?.role === "agent") {
        return <Navigate to="/agent-dashboard" />;
      } else if (user?.role === "admin") {
        return <Navigate to="/admin" />;
      } else {
        return <Navigate to="/dashboard" />;
      }
    }
  }
  
  return children;
};

export default AuthGuard;
