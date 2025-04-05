
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
import { Phone, Headphones, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PhoneSupportConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: PhoneSupportConfig) => void;
  initialData?: PhoneSupportConfig;
}

export interface PhoneSupportConfig {
  phoneSystem: "twilio" | "asterisk" | "other";
  apiKey: string;
  phoneNumber: string;
  recordCalls: boolean;
  voicemail: {
    enabled: boolean;
    greeting: string;
  };
  callRouting: {
    enabled: boolean;
    welcomeMessage: string;
    options: string[];
  };
  operatingHours: {
    enabled: boolean;
    startTime: string;
    endTime: string;
    timezone: string;
  };
}

export const PhoneSupportConfig: React.FC<PhoneSupportConfigProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData
}) => {
  const form = useForm<PhoneSupportConfig>({
    defaultValues: initialData || {
      phoneSystem: "twilio",
      apiKey: "",
      phoneNumber: "",
      recordCalls: true,
      voicemail: {
        enabled: true,
        greeting: "Thank you for calling our support line. Please leave a message after the tone and we'll get back to you as soon as possible."
      },
      callRouting: {
        enabled: false,
        welcomeMessage: "Thank you for calling. For technical support, press 1. For billing inquiries, press 2. For all other inquiries, press 3.",
        options: ["Technical Support", "Billing", "Other"]
      },
      operatingHours: {
        enabled: true,
        startTime: "09:00",
        endTime: "17:00",
        timezone: "UTC"
      }
    }
  });

  const handleSubmit = (data: PhoneSupportConfig) => {
    console.log("Phone support configuration saved:", data);
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <DialogTitle>Configure Phone Support</DialogTitle>
          </div>
          <DialogDescription>
            Set up phone integration to create tickets from calls
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phoneSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone System</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select system" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="twilio">Twilio</SelectItem>
                        <SelectItem value="asterisk">Asterisk</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+1 (555) 123-4567" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key / Access Token</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    API key for your phone system provider
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recordCalls"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Headphones className="h-4 w-4 text-primary" />
                      <FormLabel className="text-base">Record Calls</FormLabel>
                    </div>
                    <FormDescription>
                      Record calls for quality assurance and training
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
              name="voicemail.enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Voicemail</FormLabel>
                    <FormDescription>
                      Enable voicemail for missed calls
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

            {form.watch("voicemail.enabled") && (
              <FormField
                control={form.control}
                name="voicemail.greeting"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voicemail Greeting</FormLabel>
                    <FormControl>
                      <textarea
                        className="w-full min-h-[100px] rounded-md border p-2"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="callRouting.enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Call Routing</FormLabel>
                    <FormDescription>
                      Set up an interactive voice response (IVR) system
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

            {form.watch("callRouting.enabled") && (
              <>
                <FormField
                  control={form.control}
                  name="callRouting.welcomeMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Welcome Message</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full min-h-[100px] rounded-md border p-2"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Routing Options</FormLabel>
                  <div className="space-y-2">
                    {form.watch("callRouting.options").map((option, index) => (
                      <div className="flex items-center gap-2" key={index}>
                        <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...form.watch("callRouting.options")];
                            newOptions[index] = e.target.value;
                            form.setValue("callRouting.options", newOptions);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newOptions = [...form.watch("callRouting.options"), "New Option"];
                      form.setValue("callRouting.options", newOptions);
                    }}
                  >
                    Add Option
                  </Button>
                </div>
              </>
            )}

            <FormField
              control={form.control}
              name="operatingHours.enabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <FormLabel className="text-base">Operating Hours</FormLabel>
                    </div>
                    <FormDescription>
                      Set specific hours when phone support is available
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
              <div className="grid grid-cols-1 gap-4">
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

                <FormField
                  control={form.control}
                  name="operatingHours.timezone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timezone</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                          <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                          <SelectItem value="GMT">Greenwich Mean Time (GMT)</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            )}

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
