import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { TicketPriority, SystemSettingsFormData, SocialMediaConfig, EmailSupportConfig as EmailConfig, ChatSupportConfig as ChatConfig, PhoneSupportConfig as PhoneConfig } from "@/lib/types";
import { Settings, Mail, Bell, Shield, Link as LinkIcon, MessageSquare, Globe, Phone, Loader2 } from "lucide-react";
import { EmailSupportConfig } from "@/components/integrations/EmailSupportConfig";
import { ChatSupportConfig } from "@/components/integrations/ChatSupportConfig";
import { SocialMediaConfig as SocialMediaConfigComponent } from "@/components/integrations/SocialMediaConfig";
import { PhoneSupportConfig } from "@/components/integrations/PhoneSupportConfig";
import { supabase } from "@/integrations/supabase/client";

const SystemSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [settingsId, setSettingsId] = useState<string | null>(null);
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
  const [socialConfig, setSocialConfig] = useState<SocialMediaConfig>();
  const [phoneConfig, setPhoneConfig] = useState<PhoneConfig>();

  // Fetch settings from Supabase when component mounts
  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoading(true);
        
        // Fetch system settings
        const { data: systemData, error: systemError } = await supabase
          .from('system_settings')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();
        
        if (systemError) throw systemError;
        
        if (systemData) {
          setSettingsId(systemData.id);
          
          // Update state with data from database
          setSettings({
            siteName: systemData.site_name,
            emailNotifications: systemData.email_notifications,
            autoAssignment: systemData.auto_assignment,
            defaultPriority: systemData.default_priority as TicketPriority,
            forcePasswordChange: systemData.force_password_change,
            twoFactorAuth: systemData.two_factor_auth,
            crmIntegration: systemData.crm_integration,
            emailClientIntegration: systemData.email_client_integration,
            projectManagementIntegration: systemData.project_management_integration,
            emailSupport: systemData.email_support,
            chatSupport: systemData.chat_support,
            socialMediaSupport: systemData.social_media_support,
            phoneSupport: systemData.phone_support,
          });
          
          // Fetch email config if email support is enabled
          if (systemData.email_support) {
            const { data: emailData, error: emailError } = await supabase
              .from('email_support_configs')
              .select('*')
              .eq('settings_id', systemData.id)
              .maybeSingle();
            
            if (!emailError && emailData) {
              setEmailConfig({
                incomingEmailAddress: emailData.incoming_email_address,
                outgoingEmailAddress: emailData.outgoing_email_address,
                emailSignature: emailData.email_signature,
                autoResponderEnabled: emailData.auto_responder_enabled,
                autoResponderMessage: emailData.auto_responder_message,
              });
            }
          }
          
          // Fetch chat config if chat support is enabled
          if (systemData.chat_support) {
            const { data: chatData, error: chatError } = await supabase
              .from('chat_support_configs')
              .select('*')
              .eq('settings_id', systemData.id)
              .maybeSingle();
            
            if (!chatError && chatData) {
              setChatConfig({
                widgetTitle: chatData.widget_title,
                widgetPosition: chatData.widget_position as "bottom-right" | "bottom-left",
                primaryColor: chatData.primary_color,
                welcomeMessage: chatData.welcome_message,
                offlineMessage: chatData.offline_message,
                agentDisplayName: chatData.agent_display_name,
                operatingHours: {
                  enabled: chatData.operating_hours_enabled,
                  startTime: chatData.operating_hours_start_time,
                  endTime: chatData.operating_hours_end_time,
                },
              });
            }
          }
          
          // Fetch social media config if social media support is enabled
          if (systemData.social_media_support) {
            const { data: socialData, error: socialError } = await supabase
              .from('social_media_configs')
              .select('*')
              .eq('settings_id', systemData.id)
              .maybeSingle();
            
            if (!socialError && socialData) {
              setSocialConfig({
                twitter: {
                  enabled: socialData.twitter_enabled,
                  username: socialData.twitter_username,
                  apiKey: socialData.twitter_api_key,
                  autoCreate: socialData.twitter_auto_create,
                },
                facebook: {
                  enabled: socialData.facebook_enabled,
                  username: socialData.facebook_username,
                  apiKey: socialData.facebook_api_key,
                  autoCreate: socialData.facebook_auto_create,
                },
                instagram: {
                  enabled: socialData.instagram_enabled,
                  username: socialData.instagram_username,
                  apiKey: socialData.instagram_api_key,
                  autoCreate: socialData.instagram_auto_create,
                },
                convertPrivateMessages: socialData.convert_private_messages,
                convertPublicMentions: socialData.convert_public_mentions,
                responseTemplate: socialData.response_template,
              });
            }
          }
          
          // Fetch phone config if phone support is enabled
          if (systemData.phone_support) {
            const { data: phoneData, error: phoneError } = await supabase
              .from('phone_support_configs')
              .select('*')
              .eq('settings_id', systemData.id)
              .maybeSingle();
            
            if (!phoneError && phoneData) {
              setPhoneConfig({
                phoneSystem: phoneData.phone_system as "twilio" | "asterisk" | "other",
                apiKey: phoneData.api_key,
                phoneNumber: phoneData.phone_number,
                recordCalls: phoneData.record_calls,
                voicemail: {
                  enabled: phoneData.voicemail_enabled,
                  greeting: phoneData.voicemail_greeting,
                },
                callRouting: {
                  enabled: phoneData.call_routing_enabled,
                  welcomeMessage: phoneData.call_routing_welcome_message,
                  options: phoneData.call_routing_options,
                },
                operatingHours: {
                  enabled: phoneData.operating_hours_enabled,
                  startTime: phoneData.operating_hours_start_time,
                  endTime: phoneData.operating_hours_end_time,
                  timezone: phoneData.operating_hours_timezone,
                }
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
        toast({
          title: "Error",
          description: "Failed to load settings. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchSettings();
  }, [toast]);

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

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      
      // If we don't have a settings ID yet, get the first record
      if (!settingsId) {
        const { data, error } = await supabase
          .from('system_settings')
          .select('id')
          .limit(1)
          .single();
          
        if (error) throw error;
        if (data) {
          setSettingsId(data.id);
        }
      }
      
      if (!settingsId) {
        toast({
          title: "Error",
          description: "No settings record found. Please try again.",
          variant: "destructive",
        });
        setIsSaving(false);
        return;
      }
      
      // Update system settings
      const { error: updateError } = await supabase
        .from('system_settings')
        .update({
          site_name: settings.siteName,
          email_notifications: settings.emailNotifications,
          auto_assignment: settings.autoAssignment,
          default_priority: settings.defaultPriority,
          force_password_change: settings.forcePasswordChange,
          two_factor_auth: settings.twoFactorAuth,
          crm_integration: settings.crmIntegration,
          email_client_integration: settings.emailClientIntegration,
          project_management_integration: settings.projectManagementIntegration,
          email_support: settings.emailSupport,
          chat_support: settings.chatSupport,
          social_media_support: settings.socialMediaSupport,
          phone_support: settings.phoneSupport,
          updated_at: new Date().toISOString(),
        })
        .eq('id', settingsId);
        
      if (updateError) throw updateError;
      
      // Update email config if email support is enabled
      if (settings.emailSupport && emailConfig) {
        const { data: existingEmail, error: checkError } = await supabase
          .from('email_support_configs')
          .select('id')
          .eq('settings_id', settingsId)
          .maybeSingle();
          
        if (checkError) throw checkError;
        
        if (existingEmail) {
          // Update existing config
          const { error: emailError } = await supabase
            .from('email_support_configs')
            .update({
              incoming_email_address: emailConfig.incomingEmailAddress,
              outgoing_email_address: emailConfig.outgoingEmailAddress,
              email_signature: emailConfig.emailSignature,
              auto_responder_enabled: emailConfig.autoResponderEnabled,
              auto_responder_message: emailConfig.autoResponderMessage,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingEmail.id);
            
          if (emailError) throw emailError;
        } else {
          // Insert new config
          const { error: emailError } = await supabase
            .from('email_support_configs')
            .insert({
              settings_id: settingsId,
              incoming_email_address: emailConfig.incomingEmailAddress,
              outgoing_email_address: emailConfig.outgoingEmailAddress,
              email_signature: emailConfig.emailSignature,
              auto_responder_enabled: emailConfig.autoResponderEnabled,
              auto_responder_message: emailConfig.autoResponderMessage,
            });
            
          if (emailError) throw emailError;
        }
      }
      
      // Update chat config if chat support is enabled
      if (settings.chatSupport && chatConfig) {
        const { data: existingChat, error: checkError } = await supabase
          .from('chat_support_configs')
          .select('id')
          .eq('settings_id', settingsId)
          .maybeSingle();
          
        if (checkError) throw checkError;
        
        if (existingChat) {
          // Update existing config
          const { error: chatError } = await supabase
            .from('chat_support_configs')
            .update({
              widget_title: chatConfig.widgetTitle,
              widget_position: chatConfig.widgetPosition,
              primary_color: chatConfig.primaryColor,
              welcome_message: chatConfig.welcomeMessage,
              offline_message: chatConfig.offlineMessage,
              agent_display_name: chatConfig.agentDisplayName,
              operating_hours_enabled: chatConfig.operatingHours.enabled,
              operating_hours_start_time: chatConfig.operatingHours.startTime,
              operating_hours_end_time: chatConfig.operatingHours.endTime,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingChat.id);
            
          if (chatError) throw chatError;
        } else {
          // Insert new config
          const { error: chatError } = await supabase
            .from('chat_support_configs')
            .insert({
              settings_id: settingsId,
              widget_title: chatConfig.widgetTitle,
              widget_position: chatConfig.widgetPosition,
              primary_color: chatConfig.primaryColor,
              welcome_message: chatConfig.welcomeMessage,
              offline_message: chatConfig.offlineMessage,
              agent_display_name: chatConfig.agentDisplayName,
              operating_hours_enabled: chatConfig.operatingHours.enabled,
              operating_hours_start_time: chatConfig.operatingHours.startTime,
              operating_hours_end_time: chatConfig.operatingHours.endTime,
            });
            
          if (chatError) throw chatError;
        }
      }
      
      // Update social media config if social media support is enabled
      if (settings.socialMediaSupport && socialConfig) {
        const { data: existingSocial, error: checkError } = await supabase
          .from('social_media_configs')
          .select('id')
          .eq('settings_id', settingsId)
          .maybeSingle();
          
        if (checkError) throw checkError;
        
        if (existingSocial) {
          // Update existing config
          const { error: socialError } = await supabase
            .from('social_media_configs')
            .update({
              twitter_enabled: socialConfig.twitter.enabled,
              twitter_username: socialConfig.twitter.username,
              twitter_api_key: socialConfig.twitter.apiKey,
              twitter_auto_create: socialConfig.twitter.autoCreate,
              facebook_enabled: socialConfig.facebook.enabled,
              facebook_username: socialConfig.facebook.username,
              facebook_api_key: socialConfig.facebook.apiKey,
              facebook_auto_create: socialConfig.facebook.autoCreate,
              instagram_enabled: socialConfig.instagram.enabled,
              instagram_username: socialConfig.instagram.username,
              instagram_api_key: socialConfig.instagram.apiKey,
              instagram_auto_create: socialConfig.instagram.autoCreate,
              convert_private_messages: socialConfig.convertPrivateMessages,
              convert_public_mentions: socialConfig.convertPublicMentions,
              response_template: socialConfig.responseTemplate,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingSocial.id);
            
          if (socialError) throw socialError;
        } else {
          // Insert new config
          const { error: socialError } = await supabase
            .from('social_media_configs')
            .insert({
              settings_id: settingsId,
              twitter_enabled: socialConfig.twitter.enabled,
              twitter_username: socialConfig.twitter.username,
              twitter_api_key: socialConfig.twitter.apiKey,
              twitter_auto_create: socialConfig.twitter.autoCreate,
              facebook_enabled: socialConfig.facebook.enabled,
              facebook_username: socialConfig.facebook.username,
              facebook_api_key: socialConfig.facebook.apiKey,
              facebook_auto_create: socialConfig.facebook.autoCreate,
              instagram_enabled: socialConfig.instagram.enabled,
              instagram_username: socialConfig.instagram.username,
              instagram_api_key: socialConfig.instagram.apiKey,
              instagram_auto_create: socialConfig.instagram.autoCreate,
              convert_private_messages: socialConfig.convertPrivateMessages,
              convert_public_mentions: socialConfig.convertPublicMentions,
              response_template: socialConfig.responseTemplate,
            });
            
          if (socialError) throw socialError;
        }
      }
      
      // Update phone config if phone support is enabled
      if (settings.phoneSupport && phoneConfig) {
        const { data: existingPhone, error: checkError } = await supabase
          .from('phone_support_configs')
          .select('id')
          .eq('settings_id', settingsId)
          .maybeSingle();
          
        if (checkError) throw checkError;
        
        if (existingPhone) {
          // Update existing config
          const { error: phoneError } = await supabase
            .from('phone_support_configs')
            .update({
              phone_system: phoneConfig.phoneSystem,
              api_key: phoneConfig.apiKey,
              phone_number: phoneConfig.phoneNumber,
              record_calls: phoneConfig.recordCalls,
              voicemail_enabled: phoneConfig.voicemail.enabled,
              voicemail_greeting: phoneConfig.voicemail.greeting,
              call_routing_enabled: phoneConfig.callRouting.enabled,
              call_routing_welcome_message: phoneConfig.callRouting.welcomeMessage,
              call_routing_options: phoneConfig.callRouting.options,
              operating_hours_enabled: phoneConfig.operatingHours.enabled,
              operating_hours_start_time: phoneConfig.operatingHours.startTime,
              operating_hours_end_time: phoneConfig.operatingHours.endTime,
              operating_hours_timezone: phoneConfig.operatingHours.timezone,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existingPhone.id);
            
          if (phoneError) throw phoneError;
        } else {
          // Insert new config
          const { error: phoneError } = await supabase
            .from('phone_support_configs')
            .insert({
              settings_id: settingsId,
              phone_system: phoneConfig.phoneSystem,
              api_key: phoneConfig.apiKey,
              phone_number: phoneConfig.phoneNumber,
              record_calls: phoneConfig.recordCalls,
              voicemail_enabled: phoneConfig.voicemail.enabled,
              voicemail_greeting: phoneConfig.voicemail.greeting,
              call_routing_enabled: phoneConfig.callRouting.enabled,
              call_routing_welcome_message: phoneConfig.callRouting.welcomeMessage,
              call_routing_options: phoneConfig.callRouting.options,
              operating_hours_enabled: phoneConfig.operatingHours.enabled,
              operating_hours_start_time: phoneConfig.operatingHours.startTime,
              operating_hours_end_time: phoneConfig.operatingHours.endTime,
              operating_hours_timezone: phoneConfig.operatingHours.timezone,
            });
            
          if (phoneError) throw phoneError;
        }
      }
      
      toast({
        title: "Settings Saved",
        description: "Your system settings have been updated successfully",
      });
      
    } catch (error) {
      console.error("Error saving settings:", error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-10 px-4 flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-lg text-muted-foreground">Loading settings...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-gray-500 mt-1">Configure your support ticketing system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General Settings Card */}
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

          {/* Email Notifications Card */}
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

          {/* Ticket Assignment Card */}
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

          {/* Security Card */}
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

          {/* Integration Settings Card */}
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

          {/* Multi-Channel Support Card */}
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
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Settings'
            )}
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

        <SocialMediaConfigComponent
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
