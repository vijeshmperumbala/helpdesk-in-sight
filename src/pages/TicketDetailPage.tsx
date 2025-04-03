
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById, getTicketComments, updateTicketStatus } from "@/lib/tickets";
import { getCurrentUser } from "@/lib/auth";
import { Layout } from "@/components/Layout";
import { TicketComments } from "@/components/TicketComments";
import { Ticket, TicketComment, TicketStatus } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TicketDetailPage = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getCurrentUser();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!ticketId || !currentUser) return;
    
    const fetchedTicket = getTicketById(ticketId);
    
    if (!fetchedTicket) {
      toast({
        title: "Ticket not found",
        description: "The ticket you're looking for doesn't exist",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }
    
    // Check if this ticket belongs to the current user
    if (fetchedTicket.userId !== currentUser.id) {
      toast({
        title: "Access denied",
        description: "You don't have permission to view this ticket",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }
    
    setTicket(fetchedTicket);
    loadComments(fetchedTicket.id);
    setIsLoading(false);
  }, [ticketId, currentUser, navigate, toast]);

  const loadComments = (ticketId: string) => {
    const fetchedComments = getTicketComments(ticketId, false); // Users don't see internal comments
    setComments(fetchedComments);
  };

  const handleTicketStatusChange = (status: string) => {
    if (!ticket || !currentUser) return;
    
    const updatedTicket = updateTicketStatus(ticket.id, status as TicketStatus);
    
    if (updatedTicket) {
      setTicket(updatedTicket);
      toast({
        title: "Status updated",
        description: `Ticket status updated to ${status}`,
      });
    }
  };

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

  if (isLoading || !ticket || !currentUser) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4">
          <p className="text-center">Loading ticket details...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Tickets
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold mb-2">{ticket.subject}</h1>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                    <span>{ticket.id}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Created {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      Updated {format(new Date(ticket.updatedAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority} Priority
                  </Badge>
                  <Badge variant="outline">{ticket.category}</Badge>
                </div>
              </div>

              <div className="prose max-w-full">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <div className="bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                  {ticket.description}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <TicketComments 
                comments={comments} 
                ticketId={ticket.id} 
                currentUser={currentUser}
                onCommentAdded={() => loadComments(ticket.id)}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Ticket Status</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Current Status:</span>
                  <Badge className={getStatusColor(ticket.status)}>
                    {ticket.status}
                  </Badge>
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-2">
                    Update Status:
                  </label>
                  <Select 
                    defaultValue={ticket.status} 
                    onValueChange={handleTicketStatusChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-2">
                    You can update the status if your issue is resolved or needs to be reopened.
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-sm mb-2">Ticket Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">ID:</span>
                      <span className="text-sm font-medium">{ticket.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Created:</span>
                      <span className="text-sm">{format(new Date(ticket.createdAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Updated:</span>
                      <span className="text-sm">{format(new Date(ticket.updatedAt), "MMM d, yyyy")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Category:</span>
                      <span className="text-sm">{ticket.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Priority:</span>
                      <span className="text-sm">{ticket.priority}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TicketDetailPage;
