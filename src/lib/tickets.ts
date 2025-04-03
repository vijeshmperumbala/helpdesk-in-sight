
// Ticket utility functions
import { tickets, ticketComments, generateTicketId } from "./data";
import { Ticket, TicketComment, User, TicketFormData, CommentFormData, TicketStatus } from "./types";

// Get all tickets
export const getAllTickets = (): Ticket[] => {
  return [...tickets].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// Get tickets for a specific user
export const getUserTickets = (userId: string): Ticket[] => {
  return tickets
    .filter((ticket) => ticket.userId === userId)
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

// Get ticket by ID
export const getTicketById = (id: string): Ticket | undefined => {
  return tickets.find((ticket) => ticket.id === id);
};

// Get comments for a specific ticket
export const getTicketComments = (ticketId: string, showInternal: boolean = false): TicketComment[] => {
  return ticketComments
    .filter((comment) => 
      comment.ticketId === ticketId && (showInternal || !comment.isInternal)
    )
    .sort((a, b) => 
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
};

// Create a new ticket
export const createTicket = (formData: TicketFormData, user: User): Ticket => {
  const newTicket: Ticket = {
    id: generateTicketId(),
    subject: formData.subject,
    description: formData.description,
    category: formData.category,
    priority: formData.priority,
    status: "Open",
    userId: user.id,
    agentId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Add to our mock database
  tickets.push(newTicket);
  return newTicket;
};

// Update ticket status
export const updateTicketStatus = (ticketId: string, status: TicketStatus): Ticket | null => {
  const ticketIndex = tickets.findIndex(t => t.id === ticketId);
  if (ticketIndex === -1) return null;
  
  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    status,
    updatedAt: new Date().toISOString()
  };
  
  return tickets[ticketIndex];
};

// Assign ticket to agent
export const assignTicket = (ticketId: string, agentId: string): Ticket | null => {
  const ticketIndex = tickets.findIndex(t => t.id === ticketId);
  if (ticketIndex === -1) return null;
  
  tickets[ticketIndex] = {
    ...tickets[ticketIndex],
    agentId,
    updatedAt: new Date().toISOString()
  };
  
  return tickets[ticketIndex];
};

// Add comment to a ticket
export const addComment = (formData: CommentFormData, ticketId: string, user: User): TicketComment => {
  const newComment: TicketComment = {
    id: `comment-${ticketComments.length + 1}`,
    ticketId,
    userId: user.id,
    text: formData.text,
    isInternal: !!formData.isInternal,
    createdAt: new Date().toISOString(),
  };

  // Add to our mock database
  ticketComments.push(newComment);
  
  // Update the ticket's updatedAt timestamp
  const ticketIndex = tickets.findIndex(t => t.id === ticketId);
  if (ticketIndex !== -1) {
    tickets[ticketIndex].updatedAt = new Date().toISOString();
  }
  
  return newComment;
};

// Search tickets
export const searchTickets = (query: string, userTicketsOnly: boolean = false, userId?: string): Ticket[] => {
  return tickets
    .filter((ticket) => {
      // Filter by user if needed
      if (userTicketsOnly && userId && ticket.userId !== userId) {
        return false;
      }

      // Search in subject and description
      const matchesQuery = 
        ticket.subject.toLowerCase().includes(query.toLowerCase()) ||
        ticket.description.toLowerCase().includes(query.toLowerCase()) ||
        ticket.id.toLowerCase().includes(query.toLowerCase());
        
      return matchesQuery;
    })
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};

// Filter tickets by status
export const filterTicketsByStatus = (status: TicketStatus | "All", userTicketsOnly: boolean = false, userId?: string): Ticket[] => {
  return tickets
    .filter((ticket) => {
      // Filter by user if needed
      if (userTicketsOnly && userId && ticket.userId !== userId) {
        return false;
      }

      // Filter by status
      return status === "All" || ticket.status === status;
    })
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
};
