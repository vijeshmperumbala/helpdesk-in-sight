
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TicketPriority } from "@/lib/types";
import { Settings, Mail, Bell, Shield } from "lucide-react";

const SystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "Support Ticketing System",
    emailNotifications: true,
    autoAssignment: true,
    defaultPriority: "Medium" as TicketPriority,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({ ...prev, [name]: checked }));
  };

  const handlePriorityChange = (priority: string) => {
    setSettings(prev => ({ ...prev, defaultPriority: priority as TicketPriority }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your system settings have been updated successfully",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-gray-500 mt-1">Configure your support ticketing system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                <CardTitle>General Settings</CardTitle>
              </div>
              <CardDescription>Configure basic system settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input 
                  id="siteName" 
                  name="siteName" 
                  value={settings.siteName} 
                  onChange={handleInputChange} 
                />
                <p className="text-sm text-muted-foreground">
                  This name will appear in the header and emails
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Email Notifications</CardTitle>
              </div>
              <CardDescription>Configure email notification settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications" className="text-base">Enable Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications for ticket updates via email
                  </p>
                </div>
                <Switch 
                  id="email-notifications" 
                  checked={settings.emailNotifications} 
                  onCheckedChange={(checked) => handleSwitchChange("emailNotifications", checked)} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Ticket Assignment</CardTitle>
              </div>
              <CardDescription>Configure ticket assignment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-assignment" className="text-base">Auto-assign Tickets</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically assign new tickets to available agents
                  </p>
                </div>
                <Switch 
                  id="auto-assignment" 
                  checked={settings.autoAssignment} 
                  onCheckedChange={(checked) => handleSwitchChange("autoAssignment", checked)} 
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="default-priority">Default Priority</Label>
                <Select 
                  value={settings.defaultPriority} 
                  onValueChange={handlePriorityChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Default priority for new tickets
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Security</CardTitle>
              </div>
              <CardDescription>Configure security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="force-password-change" className="text-base">Force Password Change</Label>
                  <p className="text-sm text-muted-foreground">
                    Force users to change password after 90 days
                  </p>
                </div>
                <Switch 
                  id="force-password-change" 
                  checked={false} 
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label htmlFor="two-factor" className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for admin accounts
                  </p>
                </div>
                <Switch 
                  id="two-factor" 
                  checked={false} 
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SystemSettings;
