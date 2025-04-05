
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
import { Mail } from "lucide-react";

interface EmailSupportConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: EmailSupportConfig) => void;
  initialData?: EmailSupportConfig;
}

export interface EmailSupportConfig {
  incomingEmailAddress: string;
  outgoingEmailAddress: string;
  emailSignature: string;
  autoResponderEnabled: boolean;
  autoResponderMessage: string;
}

export const EmailSupportConfig: React.FC<EmailSupportConfigProps> = ({
  open,
  onOpenChange,
  onSave,
  initialData
}) => {
  const form = useForm<EmailSupportConfig>({
    defaultValues: initialData || {
      incomingEmailAddress: "support@yourcompany.com",
      outgoingEmailAddress: "no-reply@yourcompany.com",
      emailSignature: "Your Support Team",
      autoResponderEnabled: true,
      autoResponderMessage: "Thank you for contacting us. We've received your request and will get back to you as soon as possible."
    }
  });

  const handleSubmit = (data: EmailSupportConfig) => {
    console.log("Email support configuration saved:", data);
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <DialogTitle>Configure Email Support</DialogTitle>
          </div>
          <DialogDescription>
            Setup how users can create and update tickets via email
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="incomingEmailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Incoming Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Emails sent to this address will be converted to tickets
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="outgoingEmailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outgoing Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Ticket updates will be sent from this address
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emailSignature"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Signature</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This signature will be added to all outgoing emails
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="autoResponderEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Auto-Responder</FormLabel>
                    <FormDescription>
                      Send an automatic response to incoming ticket emails
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

            {form.watch("autoResponderEnabled") && (
              <FormField
                control={form.control}
                name="autoResponderMessage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Auto-Responder Message</FormLabel>
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
