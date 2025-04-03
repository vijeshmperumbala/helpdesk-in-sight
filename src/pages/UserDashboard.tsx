
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { TicketList } from "@/components/TicketList";
import { getCurrentUser } from "@/lib/auth";
import { getUserTickets, searchTickets, filterTicketsByStatus } from "@/lib/tickets";
import { Ticket, TicketStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const UserDashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const currentUser = getCurrentUser();

  // Load user tickets
  useEffect(() => {
    if (currentUser) {
      const userTickets = getUserTickets(currentUser.id);
      setTickets(userTickets);
    }
  }, [currentUser]);

  // Handle search
  const handleSearch = (searchTerm: string) => {
    if (!currentUser) return;
    
    if (searchTerm.trim() === "") {
      const userTickets = getUserTickets(currentUser.id);
      setTickets(userTickets);
    } else {
      const filteredTickets = searchTickets(searchTerm, true, currentUser.id);
      setTickets(filteredTickets);
    }
  };

  // Handle status filter
  const handleStatusFilter = (status: TicketStatus | "All") => {
    if (!currentUser) return;
    
    const filteredTickets = filterTicketsByStatus(status, true, currentUser.id);
    setTickets(filteredTickets);
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Tickets</h1>
            <p className="text-gray-500 mt-1">View and manage your support tickets</p>
          </div>
          <Link to="/create-ticket">
            <Button className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Ticket
            </Button>
          </Link>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <TicketList 
            tickets={tickets} 
            onSearch={handleSearch}
            onFilterByStatus={handleStatusFilter}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
