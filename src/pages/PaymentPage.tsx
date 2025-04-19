import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreditCard, Building, User, MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const paymentFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  propertyId: z.string().optional(),
  amount: z.string().min(1, "Amount is required"),
  paymentMethod: z.enum(["card", "bankTransfer", "mobileMoney"]),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      propertyId: "",
      amount: "",
      paymentMethod: "mobileMoney",
    },
  });

  const onSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call for payment processing
    try {
      // In a real implementation, this would be a call to a payment API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentSuccess(true);
      toast({
        title: "Payment Initiated!",
        description: "We've sent you payment instructions via email.",
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative py-24 bg-gradient-to-r from-hm-green-dark to-hm-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Make a Payment</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Secure and convenient payment options for your property transactions
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
            {paymentSuccess ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Payment Initiated Successfully!</h2>
                <p className="mb-6 text-gray-600">
                  Thank you for your payment. We've sent detailed instructions to your email.
                  Our team will contact you shortly to confirm your payment.
                </p>
                <Button asChild className="bg-hm-green hover:bg-hm-green-dark">
                  <a href="/properties">Browse More Properties</a>
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input className="pl-10" placeholder="John Doe" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input className="pl-10" placeholder="johndoe@example.com" type="email" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input className="pl-10" placeholder="+256 700 123 456" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input className="pl-10" placeholder="Kampala, Uganda" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="propertyId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Property ID (Optional)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input className="pl-10" placeholder="e.g. PROP123" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Amount (UGX)</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-3 text-gray-400">UGX</span>
                                <Input className="pl-12" placeholder="1,000,000" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Payment Method</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            form.watch("paymentMethod") === "card" 
                              ? "border-hm-green bg-green-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => form.setValue("paymentMethod", "card")}
                        >
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-hm-green" />
                            <span className="font-medium">Credit/Debit Card</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            form.watch("paymentMethod") === "bankTransfer" 
                              ? "border-hm-green bg-green-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => form.setValue("paymentMethod", "bankTransfer")}
                        >
                          <div className="flex items-center gap-3">
                            <Building className="h-5 w-5 text-hm-green" />
                            <span className="font-medium">Bank Transfer</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            form.watch("paymentMethod") === "mobileMoney" 
                              ? "border-hm-green bg-green-50" 
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => form.setValue("paymentMethod", "mobileMoney")}
                        >
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-hm-green" />
                            <span className="font-medium">Mobile Money</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        className="w-full bg-hm-green hover:bg-hm-green-dark" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Processing..." : "Proceed to Payment"}
                      </Button>
                    </div>
                  </form>
                </Form>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
                  <p className="text-gray-600 text-sm">
                    All payments are secure and encrypted. By making a payment, you agree to HM Property Consultants' terms and conditions.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;
