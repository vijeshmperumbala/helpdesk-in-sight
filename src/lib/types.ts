
// Define types for our ticketing system

export type UserRole = "user" | "agent" | "admin";

export type TicketStatus = "Open" | "In Progress" | "Resolved" | "Pending" | "Hold" | "Completed";

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

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface CategoryFormData {
  name: string;
}

export interface KnowledgeBaseFormData {
  title: string;
  content: string;
  category: string;
}

export interface EmailSupportConfig {
  incomingEmailAddress: string;
  outgoingEmailAddress: string;
  emailSignature: string;
  autoResponderEnabled: boolean;
  autoResponderMessage: string;
}

export interface ChatSupportConfig {
  widgetTitle: string;
  widgetPosition: "bottom-right" | "bottom-left";
  primaryColor: string;
  welcomeMessage: string;
  offlineMessage: string;
  agentDisplayName: string;
  operatingHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

export interface SocialPlatform {
  enabled: boolean;
  username: string;
  apiKey: string;
  autoCreate: boolean;
}

export interface SocialMediaConfig {
  twitter: SocialPlatform;
  facebook: SocialPlatform;
  instagram: SocialPlatform;
  convertPrivateMessages: boolean;
  convertPublicMentions: boolean;
  responseTemplate: string;
}

export interface PhoneSupportConfig {
  phoneSystem: "twilio" | "asterisk" | "other";
  apiKey: string;
  phoneNumber: string;
  recordCalls: boolean;
  voicemail: {
    enabled: boolean;
    greeting: string;
  };
  callRouting: {
    enabled: boolean;
    welcomeMessage: string;
    options: string[];
  };
  operatingHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    timezone: string;
  };
}

export interface SystemSettingsFormData {
  siteName: string;
  emailNotifications: boolean;
  autoAssignment: boolean;
  defaultPriority: TicketPriority;
  forcePasswordChange: boolean;
  twoFactorAuth: boolean;
  // Integration settings
  crmIntegration: boolean;
  emailClientIntegration: boolean;
  projectManagementIntegration: boolean;
  // Multi-channel support settings
  emailSupport: boolean;
  chatSupport: boolean;
  socialMediaSupport: boolean;
  phoneSupport: boolean;
}
