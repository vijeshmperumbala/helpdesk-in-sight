
// Mock database for our ticketing system
import { User, Ticket, TicketComment, KnowledgeBaseArticle } from "@/lib/types";

// Demo users
export const users: User[] = [
  {
    id: "user-1",
    email: "user@example.com",
    name: "John Doe",
    password: "password123", // In a real app, this would be hashed
    role: "user",
    createdAt: new Date("2023-01-15").toISOString(),
  },
  {
    id: "agent-1",
    email: "agent@example.com",
    name: "Jane Smith",
    password: "password123",
    role: "agent",
    createdAt: new Date("2023-01-10").toISOString(),
  },
  {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin User",
    password: "password123",
    role: "admin",
    createdAt: new Date("2023-01-05").toISOString(),
  },
];

// Demo tickets
export const tickets: Ticket[] = [
  {
    id: "TICKET-1001",
    subject: "Can't log into my account",
    description: "I'm trying to log in but keep getting an error message saying 'Invalid credentials'.",
    category: "Bug",
    priority: "High",
    status: "Open",
    userId: "user-1",
    agentId: "agent-1",
    createdAt: new Date("2023-03-15T10:30:00").toISOString(),
    updatedAt: new Date("2023-03-15T10:30:00").toISOString(),
  },
  {
    id: "TICKET-1002",
    subject: "Feature request: Dark mode",
    description: "I would love to see a dark mode option in the application. It would be easier on the eyes when working at night.",
    category: "Feature Request",
    priority: "Medium",
    status: "In Progress",
    userId: "user-1",
    agentId: "agent-1",
    createdAt: new Date("2023-03-10T14:20:00").toISOString(),
    updatedAt: new Date("2023-03-12T09:45:00").toISOString(),
  },
  {
    id: "TICKET-1003",
    subject: "Question about billing",
    description: "I was charged twice for my subscription this month. Can someone help me get this resolved?",
    category: "General Inquiry",
    priority: "High",
    status: "Resolved",
    userId: "user-1",
    agentId: "agent-1",
    createdAt: new Date("2023-03-05T09:15:00").toISOString(),
    updatedAt: new Date("2023-03-07T11:30:00").toISOString(),
  },
  {
    id: "TICKET-1004",
    subject: "Application crashes on startup",
    description: "After the latest update, the application crashes immediately when I try to open it.",
    category: "Bug",
    priority: "High",
    status: "Open",
    userId: "user-1",
    agentId: null,
    createdAt: new Date("2023-03-18T16:45:00").toISOString(),
    updatedAt: new Date("2023-03-18T16:45:00").toISOString(),
  },
];

// Demo ticket comments
export const ticketComments: TicketComment[] = [
  {
    id: "comment-1",
    ticketId: "TICKET-1001",
    userId: "user-1",
    text: "Any update on this issue? It's been a few days now.",
    isInternal: false,
    createdAt: new Date("2023-03-17T11:30:00").toISOString(),
  },
  {
    id: "comment-2",
    ticketId: "TICKET-1001",
    userId: "agent-1",
    text: "I've checked your account and it appears there might be an issue with your password. Could you try resetting it?",
    isInternal: false,
    createdAt: new Date("2023-03-17T14:20:00").toISOString(),
  },
  {
    id: "comment-3",
    ticketId: "TICKET-1001",
    userId: "agent-1",
    text: "Need to check with the authentication team about this recurring issue.",
    isInternal: true,
    createdAt: new Date("2023-03-17T14:22:00").toISOString(),
  },
  {
    id: "comment-4",
    ticketId: "TICKET-1002",
    userId: "agent-1",
    text: "We're currently working on implementing dark mode. It should be available in the next release.",
    isInternal: false,
    createdAt: new Date("2023-03-12T09:45:00").toISOString(),
  },
  {
    id: "comment-5",
    ticketId: "TICKET-1003",
    userId: "agent-1",
    text: "I've checked with the billing department and they've confirmed there was an error. A refund has been processed and should appear in your account within 3-5 business days.",
    isInternal: false,
    createdAt: new Date("2023-03-06T10:15:00").toISOString(),
  },
  {
    id: "comment-6",
    ticketId: "TICKET-1003",
    userId: "user-1",
    text: "Thank you! I can see the refund pending in my account now.",
    isInternal: false,
    createdAt: new Date("2023-03-07T11:30:00").toISOString(),
  },
];

// Demo knowledge base articles
export const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
  {
    id: "article-1",
    title: "How to reset your password",
    content: "If you've forgotten your password, click on the 'Forgot Password' link on the login page and follow the instructions sent to your email.",
    category: "Account Management",
    createdAt: new Date("2023-01-20").toISOString(),
    updatedAt: new Date("2023-01-20").toISOString(),
  },
  {
    id: "article-2",
    title: "Subscription billing FAQ",
    content: "We bill monthly on the anniversary of your signup date. If you've been charged incorrectly, please submit a support ticket.",
    category: "Billing",
    createdAt: new Date("2023-01-25").toISOString(),
    updatedAt: new Date("2023-02-10").toISOString(),
  },
  {
    id: "article-3",
    title: "Troubleshooting application crashes",
    content: "If the application crashes on startup, try clearing your browser cache or reinstalling the application.",
    category: "Troubleshooting",
    createdAt: new Date("2023-02-05").toISOString(),
    updatedAt: new Date("2023-02-05").toISOString(),
  },
];

// Function to generate a unique ticket ID
export function generateTicketId(): string {
  const prefix = "TICKET-";
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomNumber}`;
}
