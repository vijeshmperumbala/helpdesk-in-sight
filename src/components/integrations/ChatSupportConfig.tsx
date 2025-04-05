
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
import { MessageSquare, Palette } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ChatSupportConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ChatSupportConfig) => void;
  initialData?: ChatSupportConfig;
}

export interface ChatSupportConfig {
  widgetTitle: string;
  widgetPosition: "bottom-right" | "bottom-left";
  primaryColor: string;
  welcomeMessage: string;
  offlineMessage: string;
  agentDisplayName: string;
  operatingHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
  };
}

export const ChatSupportConfig: React.FC<ChatSupportConfigProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData
}) => {
  const form = useForm<ChatSupportConfig>({
    defaultValues: initialData || {
      widgetTitle: "Chat with Support",
      widgetPosition: "bottom-right",
      primaryColor: "#4338ca",
      welcomeMessage: "Hi there! How can we help you today?",
      offlineMessage: "We're currently offline. Please leave a message and we'll get back to you as soon as possible.",
      agentDisplayName: "Support Agent",
      operatingHours: {
        enabled: true,
        startTime: "09:00",
        endTime: "17:00"
      }
    }
  });

  const handleSubmit = (data: ChatSupportConfig) => {
    console.log("Chat support configuration saved:", data);
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <DialogTitle>Configure Live Chat Support</DialogTitle>
          </div>
          <DialogDescription>
            Setup the live chat widget for your website
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="widgetTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Widget Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="widgetPosition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Widget Position</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select position" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="primaryColor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormLabel className="min-w-[100px]">Primary Color</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input {...field} type="text" />
                      <div 
                        className="h-8 w-8 rounded-md border"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="welcomeMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Welcome Message</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="offlineMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Offline Message</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agentDisplayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Display Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="operatingHours.enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Operating Hours</FormLabel>
                    <FormDescription>
                      Set specific hours when live chat is available
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

            {form.watch("operatingHours.enabled") && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="operatingHours.startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="operatingHours.endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            <div className="border p-4 rounded-lg mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-medium">Chat Widget Preview</h3>
              </div>
              <div className="h-[200px] bg-gray-100 rounded-lg relative overflow-hidden">
                <div 
                  className={`absolute ${form.watch("widgetPosition") === "bottom-right" ? "bottom-4 right-4" : "bottom-4 left-4"}`}
                >
                  <div 
                    className="w-12 h-12 rounded-full shadow-md flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: form.watch("primaryColor") }}
                  >
                    <MessageSquare className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
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
