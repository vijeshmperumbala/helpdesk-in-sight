
import React, { useState } from 'react';
import { Ticket, TicketStatus } from '@/lib/types';
import { TicketCard } from '@/components/TicketCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TicketListProps {
  tickets: Ticket[];
  isAgentView?: boolean;
  onSearch?: (searchTerm: string) => void;
  onFilterByStatus?: (status: TicketStatus | 'All') => void;
}

export const TicketList: React.FC<TicketListProps> = ({ 
  tickets, 
  isAgentView = false,
  onSearch,
  onFilterByStatus, 
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleStatusFilter = (value: string) => {
    if (onFilterByStatus) {
      onFilterByStatus(value as TicketStatus | 'All');
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input 
            placeholder="Search tickets..." 
            value={searchTerm}
            onChange={handleSearch}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-48">
          <Select onValueChange={handleStatusFilter} defaultValue="All">
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Status</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <p className="text-lg text-gray-500">No tickets found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} isAgentView={isAgentView} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;
