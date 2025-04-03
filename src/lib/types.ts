
// Define types for our ticketing system

export type UserRole = "user" | "agent" | "admin";

export type TicketStatus = "Open" | "In Progress" | "Resolved";

export type TicketPriority = "Low" | "Medium" | "High";

export type TicketCategory = "Bug" | "Feature Request" | "General Inquiry";

export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // In a real app, this would be hashed
  role: UserRole;
  createdAt: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  userId: string;
  agentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  userId: string;
  text: string;
  isInternal: boolean;
  createdAt: string;
}

export interface KnowledgeBaseArticle {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface TicketFormData {
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
}

export interface CommentFormData {
  text: string;
  isInternal?: boolean;
}
