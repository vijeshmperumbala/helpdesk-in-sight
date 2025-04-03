
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { TicketList } from "@/components/TicketList";
import { getAllTickets, searchTickets, filterTicketsByStatus } from "@/lib/tickets";
import { Ticket, TicketStatus } from "@/lib/types";

const AgentDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // Load all tickets
  useEffect(() => {
    const allTickets = getAllTickets();
    setTickets(allTickets);
  }, []);

  // Handle search
  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      const allTickets = getAllTickets();
      setTickets(allTickets);
    } else {
      const filteredTickets = searchTickets(searchTerm);
      setTickets(filteredTickets);
    }
  };

  // Handle status filter
  const handleStatusFilter = (status: TicketStatus | "All") => {
    const filteredTickets = filterTicketsByStatus(status);
    setTickets(filteredTickets);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Agent Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage and resolve customer support tickets</p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <TicketList 
            tickets={tickets} 
            isAgentView={true}
            onSearch={handleSearch}
            onFilterByStatus={handleStatusFilter}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AgentDashboard;
