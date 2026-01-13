
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Lock, CheckCircle, ChevronLeft, Calendar, Shield } from "lucide-react";
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

const cardPaymentSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be 16 digits")
    .max(19, "Invalid card number")
    .regex(/^[\d\s]+$/, "Invalid card number"),
  cardHolder: z.string().min(2, "Cardholder name is required"),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Invalid expiry date (MM/YY)"),
  cvv: z.string()
    .min(3, "CVV must be 3-4 digits")
    .max(4, "CVV must be 3-4 digits")
    .regex(/^\d+$/, "CVV must be numeric"),
  billingAddress: z.string().min(5, "Billing address is required"),
});

type CardPaymentValues = z.infer<typeof cardPaymentSchema>;

const CardPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const propertyId = searchParams.get("propertyId");
  const amount = searchParams.get("amount");
  const propertyTitle = searchParams.get("title") || "Property";

  const form = useForm<CardPaymentValues>({
    resolver: zodResolver(cardPaymentSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
    },
  });

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const onSubmit = async (data: CardPaymentValues) => {
    setIsSubmitting(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPaymentSuccess(true);
      toast({
        title: "Payment Successful!",
        description: "Your card payment has been processed successfully.",
      });
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <Link 
              to={propertyId ? `/properties/${propertyId}` : "/properties"} 
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Property
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <CreditCard className="h-8 w-8" />
              Credit/Debit Card Payment
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
            {paymentSuccess ? (
              <div className="bg-card rounded-xl shadow-lg border p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                <p className="text-muted-foreground mb-6">
                  Your card payment has been processed. A confirmation email has been sent to your registered email address.
                </p>
                <Button asChild>
                  <Link to="/properties">Browse More Properties</Link>
                </Button>
              </div>
            ) : (
              <div className="bg-card rounded-xl shadow-lg border p-6 md:p-8">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Lock className="h-4 w-4" />
                  <span>Secure Payment - Your data is encrypted</span>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input 
                                className="pl-10" 
                                placeholder="1234 5678 9012 3456" 
                                {...field}
                                onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                                maxLength={19}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="cardHolder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cardholder Name</FormLabel>
                          <FormControl>
                            <Input placeholder="JOHN DOE" {...field} className="uppercase" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  className="pl-10" 
                                  placeholder="MM/YY" 
                                  {...field}
                                  maxLength={5}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Shield className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  className="pl-10" 
                                  placeholder="123" 
                                  type="password"
                                  {...field}
                                  maxLength={4}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="billingAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Billing Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street, Kampala, Uganda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : `Pay ${amount ? formatCurrency(Number(amount)) : ""}`}
                      </Button>
                    </div>
                  </form>
                </Form>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1 text-sm">
                      <Lock className="h-4 w-4" />
                      <span>256-bit SSL</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Shield className="h-4 w-4" />
                      <span>PCI Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CardPaymentPage;
