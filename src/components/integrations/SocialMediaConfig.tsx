
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Twitter, Facebook, Instagram, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SocialMediaConfig as SocialConfig, SocialPlatform } from "@/lib/types";

interface SocialMediaConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: SocialConfig) => void;
  initialData?: SocialConfig;
}

export const SocialMediaConfig: React.FC<SocialMediaConfigProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData
}) => {
  const form = useForm<SocialConfig>({
    defaultValues: initialData || {
      twitter: {
        enabled: false,
        username: "",
        apiKey: "",
        autoCreate: true
      },
      facebook: {
        enabled: false,
        username: "",
        apiKey: "",
        autoCreate: true
      },
      instagram: {
        enabled: false,
        username: "",
        apiKey: "",
        autoCreate: true
      },
      convertPrivateMessages: true,
      convertPublicMentions: false,
      responseTemplate: "Thank you for reaching out. We've created a ticket (#{{ticketId}}) for your request and will respond shortly."
    }
  });

  const handleSubmit = (data: SocialConfig) => {
    console.log("Social media configuration saved:", data);
    onSave(data);
    onOpenChange(false);
  };

  const PlatformCard = ({ 
    platform, 
    icon: Icon 
  }: { 
    platform: "twitter" | "facebook" | "instagram", 
    icon: React.ElementType 
  }) => {
    const capitalizedPlatform = platform.charAt(0).toUpperCase() + platform.slice(1);
    
    return (
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Icon className="h-5 w-5 text-primary" />
              <h3 className="font-medium">{capitalizedPlatform}</h3>
            </div>
            <FormField
              control={form.control}
              name={`${platform}.enabled`}
              render={({ field }) => (
                <FormItem className="flex items-center space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {form.watch(`${platform}.enabled`) && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name={`${platform}.username`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{capitalizedPlatform} Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder={`@your${capitalizedPlatform}`} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${platform}.apiKey`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key / Access Token</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`${platform}.autoCreate`}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <FormLabel>Auto-create tickets from messages</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            <DialogTitle>Configure Social Media Support</DialogTitle>
          </div>
          <DialogDescription>
            Connect to social media platforms to import support requests
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-2">
              <PlatformCard platform="twitter" icon={Twitter} />
              <PlatformCard platform="facebook" icon={Facebook} />
              <PlatformCard platform="instagram" icon={Instagram} />
            </div>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-medium">General Settings</h3>
              
              <FormField
                control={form.control}
                name="convertPrivateMessages"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <div>
                      <FormLabel>Convert Private Messages</FormLabel>
                      <FormDescription>
                        Create tickets from direct messages
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="convertPublicMentions"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between space-y-0">
                    <div>
                      <FormLabel>Convert Public Mentions</FormLabel>
                      <FormDescription>
                        Create tickets when your account is mentioned publicly
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="responseTemplate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Response Template</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full min-h-[100px] rounded-md border p-2"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Use &#123;&#123;ticketId&#125;&#125; to insert the ticket ID in your template
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
