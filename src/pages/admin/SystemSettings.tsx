import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TicketPriority, SystemSettingsFormData } from "@/lib/types";
import { Settings, Mail, Bell, Shield, Link as LinkIcon, MessageSquare, Globe, Phone } from "lucide-react";
import { EmailSupportConfig, type EmailSupportConfig as EmailConfig } from "@/components/integrations/EmailSupportConfig";
import { ChatSupportConfig, type ChatSupportConfig as ChatConfig } from "@/components/integrations/ChatSupportConfig";
import { SocialMediaConfig, type SocialMediaConfig as SocialConfig } from "@/components/integrations/SocialMediaConfig";
import { PhoneSupportConfig, type PhoneSupportConfig as PhoneConfig } from "@/components/integrations/PhoneSupportConfig";

const SystemSettings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SystemSettingsFormData>({
    siteName: "Helpdesk-in-Sight",
    emailNotifications: true,
    autoAssignment: true,
    defaultPriority: "Medium" as TicketPriority,
    forcePasswordChange: false,
    twoFactorAuth: false,
    crmIntegration: false,
    emailClientIntegration: false,
    projectManagementIntegration: false,
    emailSupport: true,
    chatSupport: false,
    socialMediaSupport: false,
    phoneSupport: false,
  });

  const [emailConfigOpen, setEmailConfigOpen] = useState(false);
  const [chatConfigOpen, setChatConfigOpen] = useState(false);
  const [socialConfigOpen, setSocialConfigOpen] = useState(false);
  const [phoneConfigOpen, setPhoneConfigOpen] = useState(false);

  const [emailConfig, setEmailConfig] = useState<EmailConfig>();
  const [chatConfig, setChatConfig] = useState<ChatConfig>();
  const [socialConfig, setSocialConfig] = useState<SocialConfig>();
  const [phoneConfig, setPhoneConfig] = useState<PhoneConfig>();

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
    console.log("Saving settings:", settings);
    console.log("Email config:", emailConfig);
    console.log("Chat config:", chatConfig);
    console.log("Social media config:", socialConfig);
    console.log("Phone config:", phoneConfig);
    
    if (settings.crmIntegration) {
      console.log("Initializing CRM integration");
    }
    
    if (settings.emailClientIntegration) {
      console.log("Initializing email client integration");
    }
    
    if (settings.projectManagementIntegration) {
      console.log("Initializing project management integration");
    }
    
    if (settings.emailSupport) {
      console.log("Email support channel active");
      if (emailConfig) {
        console.log("Using email configuration:", emailConfig);
        console.log(`Incoming email address: ${emailConfig.incomingEmailAddress}`);
        console.log(`Outgoing email address: ${emailConfig.outgoingEmailAddress}`);
        if (emailConfig.autoResponderEnabled) {
          console.log("Auto-responder enabled with message:", emailConfig.autoResponderMessage);
        }
      }
    }
    
    if (settings.chatSupport) {
      console.log("Chat support channel active");
      if (chatConfig) {
        console.log("Using chat configuration:", chatConfig);
        console.log(`Widget title: ${chatConfig.widgetTitle}`);
        console.log(`Widget position: ${chatConfig.widgetPosition}`);
        if (chatConfig.operatingHours.enabled) {
          console.log(`Operating hours: ${chatConfig.operatingHours.startTime} - ${chatConfig.operatingHours.endTime}`);
        }
      }
    }
    
    if (settings.socialMediaSupport) {
      console.log("Social media support channel active");
      if (socialConfig) {
        console.log("Using social media configuration:", socialConfig);
        if (socialConfig.twitter.enabled) {
          console.log(`Twitter connected: @${socialConfig.twitter.username}`);
        }
        if (socialConfig.facebook.enabled) {
          console.log(`Facebook connected: ${socialConfig.facebook.username}`);
        }
        if (socialConfig.instagram.enabled) {
          console.log(`Instagram connected: ${socialConfig.instagram.username}`);
        }
      }
    }
    
    if (settings.phoneSupport) {
      console.log("Phone support channel active");
      if (phoneConfig) {
        console.log("Using phone configuration:", phoneConfig);
        console.log(`Phone system: ${phoneConfig.phoneSystem}`);
        console.log(`Phone number: ${phoneConfig.phoneNumber}`);
        if (phoneConfig.callRouting.enabled) {
          console.log("Call routing enabled with options:", phoneConfig.callRouting.options);
        }
      }
    }
    
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
                  checked={settings.forcePasswordChange}
                  onCheckedChange={(checked) => handleSwitchChange("forcePasswordChange", checked)}
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
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSwitchChange("twoFactorAuth", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                <CardTitle>Integration Settings</CardTitle>
              </div>
              <CardDescription>Connect with other tools and platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="crm-integration" className="text-base">CRM Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect to CRM platforms to access customer history
                  </p>
                </div>
                <Switch 
                  id="crm-integration" 
                  checked={settings.crmIntegration}
                  onCheckedChange={(checked) => handleSwitchChange("crmIntegration", checked)}
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label htmlFor="email-client-integration" className="text-base">Email Client Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect to email clients for seamless communications
                  </p>
                </div>
                <Switch 
                  id="email-client-integration" 
                  checked={settings.emailClientIntegration}
                  onCheckedChange={(checked) => handleSwitchChange("emailClientIntegration", checked)}
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label htmlFor="project-management-integration" className="text-base">Project Management Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Link tickets to project management workflows
                  </p>
                </div>
                <Switch 
                  id="project-management-integration" 
                  checked={settings.projectManagementIntegration}
                  onCheckedChange={(checked) => handleSwitchChange("projectManagementIntegration", checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <CardTitle>Multi-Channel Support</CardTitle>
              </div>
              <CardDescription>Configure communication channels</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-support" className="text-base">Email Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to create and update tickets via email
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="email-support" 
                    checked={settings.emailSupport}
                    onCheckedChange={(checked) => handleSwitchChange("emailSupport", checked)}
                  />
                  {settings.emailSupport && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEmailConfigOpen(true)}
                    >
                      Configure
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label htmlFor="chat-support" className="text-base">Live Chat Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable live chat widget on your website
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="chat-support" 
                    checked={settings.chatSupport}
                    onCheckedChange={(checked) => handleSwitchChange("chatSupport", checked)}
                  />
                  {settings.chatSupport && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setChatConfigOpen(true)}
                    >
                      Configure
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label htmlFor="social-media-support" className="text-base">Social Media Support</Label>
                  <p className="text-sm text-muted-foreground">
                    Import tickets from social media platforms
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="social-media-support" 
                    checked={settings.socialMediaSupport}
                    onCheckedChange={(checked) => handleSwitchChange("socialMediaSupport", checked)}
                  />
                  {settings.socialMediaSupport && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setSocialConfigOpen(true)}
                    >
                      Configure
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <Label htmlFor="phone-support" className="text-base">Phone Support Integration</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect phone system to create tickets from calls
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch 
                    id="phone-support" 
                    checked={settings.phoneSupport}
                    onCheckedChange={(checked) => handleSwitchChange("phoneSupport", checked)}
                  />
                  {settings.phoneSupport && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPhoneConfigOpen(true)}
                    >
                      Configure
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end">
          <Button onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>

        <EmailSupportConfig
          open={emailConfigOpen}
          onOpenChange={setEmailConfigOpen}
          onSave={setEmailConfig}
          initialData={emailConfig}
        />

        <ChatSupportConfig
          open={chatConfigOpen}
          onOpenChange={setChatConfigOpen}
          onSave={setChatConfig}
          initialData={chatConfig}
        />

        <SocialMediaConfig
          open={socialConfigOpen}
          onOpenChange={setSocialConfigOpen}
          onSave={setSocialConfig}
          initialData={socialConfig}
        />

        <PhoneSupportConfig
          open={phoneConfigOpen}
          onOpenChange={setPhoneConfigOpen}
          onSave={setPhoneConfig}
          initialData={phoneConfig}
        />
      </div>
    </Layout>
  );
};

export default SystemSettings;
