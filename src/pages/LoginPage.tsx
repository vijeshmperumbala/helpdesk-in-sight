
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, isLoggedIn } from "@/lib/auth";
import { LoginFormData, UserRole } from "@/lib/types";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn()) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = login(formData);

      if (user) {
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });

        // Redirect based on user role
        if (user.role === "admin") {
          navigate("/admin");
        } else if (user.role === "agent") {
          navigate("/agent-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Sample credentials to help users try the app
  const sampleCredentials = [
    { role: "user", email: "user@example.com", password: "password123" },
    { role: "agent", email: "agent@example.com", password: "password123" },
    { role: "admin", email: "admin@example.com", password: "password123" },
  ];

  const fillCredentials = (role: UserRole) => {
    const credentials = sampleCredentials.find(cred => cred.role === role);
    if (credentials) {
      setFormData({ email: credentials.email, password: credentials.password });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : (
                    <>
                      <LogIn className="w-4 h-4 mr-2" /> Sign In
                    </>
                  )}
                </Button>
                
                <div className="text-center text-sm">
                  <p>Don't have an account? <Link to="/register" className="text-primary hover:underline">Create one</Link></p>
                </div>
                
                <div className="pt-4 border-t mt-6">
                  <p className="text-sm text-center mb-2 text-muted-foreground">Demo Accounts (Click to fill)</p>
                  <div className="flex justify-center space-x-2 text-xs">
                    <Button variant="outline" size="sm" onClick={() => fillCredentials("user")} type="button">
                      User Demo
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => fillCredentials("agent")} type="button">
                      Agent Demo
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => fillCredentials("admin")} type="button">
                      Admin Demo
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
