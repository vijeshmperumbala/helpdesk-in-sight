
import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { users, tickets, knowledgeBaseArticles } from "@/lib/data";
import { User, Settings, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Count users by role
  const userCount = users.filter(user => user.role === "user").length;
  const agentCount = users.filter(user => user.role === "agent").length;
  const adminCount = users.filter(user => user.role === "admin").length;
  
  // Count tickets by status
  const openTickets = tickets.filter(ticket => ticket.status === "Open").length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === "In Progress").length;
  const resolvedTickets = tickets.filter(ticket => ticket.status === "Resolved").length;
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage users, tickets, and knowledge base articles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {userCount} Users, {agentCount} Agents, {adminCount} Admins
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tickets</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tickets.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {openTickets} Open, {inProgressTickets} In Progress, {resolvedTickets} Resolved
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Knowledge Base Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{knowledgeBaseArticles.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {new Set(knowledgeBaseArticles.map(a => a.category)).size} categories
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Admin Sections */}
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Manage user accounts, assign roles, and control access permissions.
              </p>
              <Link to="/admin/users">
                <Button>Manage Users</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ticket Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Create, edit, and organize ticket categories to improve classification.
              </p>
              <Link to="/admin/categories">
                <Button>Manage Categories</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Create and edit knowledge base articles to help users solve common problems.
              </p>
              <Link to="/admin/knowledge-base">
                <Button>Manage Articles</Button>
              </Link>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Configure notification settings, email templates, and general system preferences.
              </p>
              <Link to="/admin/settings">
                <Button>System Settings</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
