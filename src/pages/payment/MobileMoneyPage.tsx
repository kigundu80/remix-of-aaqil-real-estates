
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smartphone, CheckCircle, ChevronLeft, Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils/currencyUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const mobileMoneySchema = z.object({
  provider: z.enum(["mtn", "airtel"]),
  phoneNumber: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(13, "Invalid phone number")
    .regex(/^(\+?256|0)?[0-9]{9}$/, "Invalid Ugandan phone number"),
  accountName: z.string().min(2, "Account holder name is required"),
});

type MobileMoneyValues = z.infer<typeof mobileMoneySchema>;

const MobileMoneyPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  const propertyId = searchParams.get("propertyId");
  const amount = searchParams.get("amount");

  const form = useForm<MobileMoneyValues>({
    resolver: zodResolver(mobileMoneySchema),
    defaultValues: {
      provider: "mtn",
      phoneNumber: "",
      accountName: "",
    },
  });

  const onSubmit = async (data: MobileMoneyValues) => {
    setIsSubmitting(true);
    try {
      // Simulate payment initiation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentInitiated(true);
      toast({
        title: "Payment Request Sent!",
        description: `Check your ${data.provider.toUpperCase()} Mobile Money for the payment prompt.`,
      });
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "There was an error initiating your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProvider = form.watch("provider");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className={`py-16 text-white ${
          selectedProvider === "mtn" 
            ? "bg-gradient-to-r from-yellow-500 to-yellow-400" 
            : "bg-gradient-to-r from-red-600 to-red-500"
        }`}>
          <div className="container mx-auto px-4">
            <Link 
              to={propertyId ? `/properties/${propertyId}` : "/properties"} 
              className="inline-flex items-center text-white/80 hover:text-white mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Property
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Smartphone className="h-8 w-8" />
              Mobile Money Payment
            </h1>
            {amount && (
              <p className="text-xl mt-2 opacity-90">
                Amount: {formatCurrency(Number(amount))}
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-xl mx-auto">
            {paymentInitiated ? (
              <Card className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Payment Request Sent!</h2>
                  <p className="text-muted-foreground mb-4">
                    A payment prompt has been sent to your mobile phone. Please check your {selectedProvider.toUpperCase()} Mobile Money and enter your PIN to complete the transaction.
                  </p>
                  <div className="p-4 bg-muted rounded-lg mb-6">
                    <p className="text-sm text-muted-foreground">Amount</p>
                    <p className="text-2xl font-bold">{amount ? formatCurrency(Number(amount)) : "—"}</p>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setPaymentInitiated(false)}
                    >
                      Try Another Number
                    </Button>
                    <Button asChild className="w-full">
                      <Link to="/properties">Browse More Properties</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Select Mobile Money Provider</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="provider"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="grid grid-cols-2 gap-4"
                              >
                                <div>
                                  <RadioGroupItem
                                    value="mtn"
                                    id="mtn"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="mtn"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-yellow-500 [&:has([data-state=checked])]:border-yellow-500 cursor-pointer"
                                  >
                                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold mb-2">
                                      MTN
                                    </div>
                                    <span className="font-medium">MTN Mobile Money</span>
                                  </Label>
                                </div>
                                <div>
                                  <RadioGroupItem
                                    value="airtel"
                                    id="airtel"
                                    className="peer sr-only"
                                  />
                                  <Label
                                    htmlFor="airtel"
                                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-500 [&:has([data-state=checked])]:border-red-500 cursor-pointer"
                                  >
                                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mb-2">
                                      AT
                                    </div>
                                    <span className="font-medium">Airtel Money</span>
                                  </Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mobile Money Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  className="pl-10" 
                                  placeholder="+256 7XX XXX XXX" 
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="accountName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Holder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="As registered with mobile money" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {amount && (
                        <div className="p-4 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Amount to Pay</p>
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(Number(amount))}
                          </p>
                        </div>
                      )}

                      <Button 
                        type="submit" 
                        className={`w-full ${
                          selectedProvider === "mtn" 
                            ? "bg-yellow-500 hover:bg-yellow-600" 
                            : "bg-red-600 hover:bg-red-700"
                        }`}
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending Request..." : "Send Payment Request"}
                      </Button>
                    </form>
                  </Form>

                  <div className="mt-6 pt-6 border-t">
                    <p className="text-sm text-muted-foreground text-center">
                      A payment prompt will be sent to your phone. Enter your Mobile Money PIN to complete the payment.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MobileMoneyPage;
