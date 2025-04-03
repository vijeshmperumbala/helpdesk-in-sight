
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTicketById, getTicketComments, updateTicketStatus, assignTicket } from "@/lib/tickets";
import { getCurrentUser } from "@/lib/auth";
import { Layout } from "@/components/Layout";
import { TicketComments } from "@/components/TicketComments";
import { Ticket, TicketComment, TicketStatus, User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, Clock, User as UserIcon, Eye } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { users } from "@/lib/data";

const AgentTicketView = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentUser = getCurrentUser();
  
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [comments, setComments] = useState<TicketComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ticketUser, setTicketUser] = useState<User | null>(null);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);

  // Filter for users with agent role for reassignment
  const agents = users.filter(user => user.role === "agent");

  useEffect(() => {
    if (!ticketId || !currentUser) return;
    
    const fetchedTicket = getTicketById(ticketId);
    
    if (!fetchedTicket) {
      toast({
        title: "Ticket not found",
        description: "The ticket you're looking for doesn't exist",
        variant: "destructive",
      });
      navigate("/agent-dashboard");
      return;
    }
    
    setTicket(fetchedTicket);
    
    // Get the user who created this ticket
    const user = users.find(u => u.id === fetchedTicket.userId);
    if (user) setTicketUser(user);
    
    loadComments(fetchedTicket.id);
    setIsLoading(false);
  }, [ticketId, currentUser, navigate, toast]);

  const loadComments = (ticketId: string) => {
    const fetchedComments = getTicketComments(ticketId, true); // Agents see internal comments
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

  const handleAssignTicket = (agentId: string) => {
    if (!ticket || !currentUser) return;
    
    const updatedTicket = assignTicket(ticket.id, agentId);
    
    if (updatedTicket) {
      setTicket(updatedTicket);
      toast({
        title: "Ticket assigned",
        description: `Ticket assigned to ${agents.find(a => a.id === agentId)?.name || "agent"}`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-500 hover:bg-red-500';
      case 'In Progress':
        return 'bg-amber-500 hover:bg-amber-500';
      case 'Pending':
        return 'bg-blue-500 hover:bg-blue-500';
      case 'Hold':
        return 'bg-purple-500 hover:bg-purple-500';
      case 'Resolved':
        return 'bg-emerald-500 hover:bg-emerald-500';
      case 'Completed':
        return 'bg-green-600 hover:bg-green-600';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open':
        return '🔴';
      case 'In Progress':
        return '🟠';
      case 'Pending':
        return '🔵';
      case 'Hold':
        return '🟣';
      case 'Resolved':
        return '🟢';
      case 'Completed':
        return '✅';
      default:
        return '⚪';
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
          onClick={() => navigate("/agent-dashboard")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsDetailViewOpen(true)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View Details</span>
                  </Button>
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
            <Card className="mb-6">
              <CardHeader>
                <h3 className="text-lg font-medium">Customer</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {ticketUser && (
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{ticketUser.name}</div>
                      <div className="text-sm text-gray-500">{ticketUser.email}</div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <h3 className="text-lg font-medium">Ticket Status</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Current Status:</span>
                  <Badge className={getStatusColor(ticket.status)}>
                    {getStatusIcon(ticket.status)} {ticket.status}
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
                      <SelectItem value="Open">🔴 Open</SelectItem>
                      <SelectItem value="In Progress">🟠 In Progress</SelectItem>
                      <SelectItem value="Pending">🔵 Pending</SelectItem>
                      <SelectItem value="Hold">🟣 Hold</SelectItem>
                      <SelectItem value="Resolved">🟢 Resolved</SelectItem>
                      <SelectItem value="Completed">✅ Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mb-6">
              <CardHeader>
                <h3 className="text-lg font-medium">Assignment</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Currently Assigned To:</span>
                  <span className="font-medium">
                    {ticket.agentId 
                      ? agents.find(a => a.id === ticket.agentId)?.name || "Unknown Agent" 
                      : "Unassigned"}
                  </span>
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-2">
                    Reassign Ticket:
                  </label>
                  <Select 
                    defaultValue={ticket.agentId || ""} 
                    onValueChange={handleAssignTicket}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select agent" />
                    </SelectTrigger>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.id} value={agent.id}>{agent.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Ticket Details</h3>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Ticket View Dialog */}
        <Dialog open={isDetailViewOpen} onOpenChange={setIsDetailViewOpen}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Ticket Details: {ticket.id}</DialogTitle>
            </DialogHeader>
            <div className="py-2 space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Status:</span>
                      <Badge className={`ml-2 ${getStatusColor(ticket.status)}`}>
                        {getStatusIcon(ticket.status)} {ticket.status}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Priority:</span>
                      <Badge className={`ml-2 ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Category:</span>
                      <span className="text-sm ml-2">{ticket.category}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium">Created:</span>
                      <span className="text-sm ml-2">{format(new Date(ticket.createdAt), "PPP p")}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Updated:</span>
                      <span className="text-sm ml-2">{format(new Date(ticket.updatedAt), "PPP p")}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Assigned to:</span>
                      <span className="text-sm ml-2">
                        {ticket.agentId 
                          ? agents.find(a => a.id === ticket.agentId)?.name || "Unknown Agent" 
                          : "Unassigned"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Customer</h3>
                <div className="bg-gray-50 p-3 rounded border">
                  {ticketUser ? (
                    <div className="flex items-start space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                        <UserIcon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{ticketUser.name}</div>
                        <div className="text-sm text-gray-500">{ticketUser.email}</div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm">Customer information not available</span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Subject</h3>
                <p className="text-sm bg-gray-50 p-3 rounded border">{ticket.subject}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <div className="text-sm bg-gray-50 p-3 rounded border whitespace-pre-wrap">
                  {ticket.description}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Activity</h3>
                <div className="text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Ticket created on {format(new Date(ticket.createdAt), "MMM d, yyyy 'at' p")}</li>
                    {comments.length > 0 && (
                      <li>Last comment on {format(new Date(comments[comments.length - 1].createdAt), "MMM d, yyyy 'at' p")}</li>
                    )}
                    {ticket.createdAt !== ticket.updatedAt && (
                      <li>Last updated on {format(new Date(ticket.updatedAt), "MMM d, yyyy 'at' p")}</li>
                    )}
                    {ticket.agentId && (
                      <li>Currently assigned to {agents.find(a => a.id === ticket.agentId)?.name || "an agent"}</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setIsDetailViewOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default AgentTicketView;
