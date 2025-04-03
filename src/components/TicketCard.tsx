
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Ticket } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface TicketCardProps {
  ticket: Ticket;
  isAgentView?: boolean;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, isAgentView = false }) => {
  // Determine badge variant based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-500 hover:bg-red-500';
      case 'In Progress':
        return 'bg-amber-500 hover:bg-amber-500';
      case 'Resolved':
        return 'bg-emerald-500 hover:bg-emerald-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Determine badge variant based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Medium':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100';
      case 'Low':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link 
      to={isAgentView ? `/agent/ticket/${ticket.id}` : `/ticket/${ticket.id}`}
      className="block transition-transform duration-200 hover:scale-[1.02]"
    >
      <Card className="overflow-hidden h-full border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium leading-tight text-left">{ticket.subject}</h3>
              <p className="text-sm text-muted-foreground text-left mt-1">
                {ticket.id} • {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
              </p>
            </div>
            <Badge className={getStatusColor(ticket.status)}>
              {ticket.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm line-clamp-2 text-left mb-4">
            {ticket.description}
          </div>
          <div className="flex justify-between items-center pt-2 text-xs">
            <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
              {ticket.priority} Priority
            </Badge>
            <Badge variant="outline">
              {ticket.category}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
