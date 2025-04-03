
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, hasRole, logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary">HelpDesk</span>
                <span className="text-2xl font-light text-gray-700">InSight</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              {!user ? (
                <>
                  <Link 
                    to="/knowledge-base" 
                    className="text-base font-medium text-gray-700 hover:text-primary"
                  >
                    Knowledge Base
                  </Link>
                </>
              ) : (
                <>
                  {hasRole("user") && (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="text-base font-medium text-gray-700 hover:text-primary"
                      >
                        My Tickets
                      </Link>
                      <Link 
                        to="/create-ticket" 
                        className="text-base font-medium text-gray-700 hover:text-primary"
                      >
                        Create Ticket
                      </Link>
                    </>
                  )}
                  
                  {(hasRole("agent") || hasRole("admin")) && (
                    <>
                      <Link 
                        to="/agent-dashboard" 
                        className="text-base font-medium text-gray-700 hover:text-primary"
                      >
                        Tickets Dashboard
                      </Link>
                    </>
                  )}
                  
                  {hasRole("admin") && (
                    <>
                      <Link 
                        to="/admin" 
                        className="text-base font-medium text-gray-700 hover:text-primary"
                      >
                        Admin
                      </Link>
                    </>
                  )}
                  
                  <Link 
                    to="/knowledge-base" 
                    className="text-base font-medium text-gray-700 hover:text-primary"
                  >
                    Knowledge Base
                  </Link>
                </>
              )}
            </nav>
            
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-700">
                    <span className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {user.name} ({user.role})
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center">
                    <LogOut className="h-4 w-4 mr-1" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/login" 
                    className="text-base font-medium text-gray-700 hover:text-primary"
                  >
                    Sign in
                  </Link>
                  <Link 
                    to="/register"
                    className="ml-8 inline-flex items-center justify-center bg-primary text-white px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium hover:bg-primary/90"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow bg-gray-50">
        {children}
      </main>
      
      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">
                © 2024 HelpDesk InSight. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-primary">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
