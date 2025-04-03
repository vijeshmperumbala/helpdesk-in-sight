
// Auth utility functions
import { users } from "./data";
import { User, LoginFormData, RegisterFormData, UserRole } from "./types";

// Check if user is logged in based on local storage
export const isLoggedIn = (): boolean => {
  const userData = localStorage.getItem("ticketSystemUser");
  return !!userData;
};

// Get current user from local storage
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem("ticketSystemUser");
  if (!userData) return null;
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

// Login function
export const login = (formData: LoginFormData): User | null => {
  const user = users.find(
    (u) => u.email === formData.email && u.password === formData.password
  );

  if (user) {
    // In a real app, we would get a token from the server
    localStorage.setItem("ticketSystemUser", JSON.stringify(user));
    return user;
  }

  return null;
};

// Register function
export const register = (formData: RegisterFormData): User | null => {
  // Check if user already exists
  const existingUser = users.find((u) => u.email === formData.email);
  if (existingUser) return null;

  // Create new user (in a real app, this would be done on the server)
  const newUser: User = {
    id: `user-${users.length + 1}`,
    email: formData.email,
    name: formData.name,
    password: formData.password, // In a real app, this would be hashed
    role: "user" as UserRole,
    createdAt: new Date().toISOString(),
  };

  // Add to our mock database
  users.push(newUser);

  // Auto-login the new user
  localStorage.setItem("ticketSystemUser", JSON.stringify(newUser));
  return newUser;
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem("ticketSystemUser");
};

// Check if user has specific role
export const hasRole = (role: UserRole): boolean => {
  const user = getCurrentUser();
  return user?.role === role;
};
