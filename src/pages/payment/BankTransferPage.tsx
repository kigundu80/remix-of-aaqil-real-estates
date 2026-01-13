
import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Copy, CheckCircle, ChevronLeft, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/utils/currencyUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BankTransferPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [confirmed, setConfirmed] = useState(false);

  const propertyId = searchParams.get("propertyId");
  const amount = searchParams.get("amount");
  const propertyTitle = searchParams.get("title") || "Property";

  const bankDetails = {
    bankName: "Stanbic Bank Uganda",
    accountName: "HM Property Consultants Ltd",
    accountNumber: "9030012345678",
    swiftCode: "SBICUGKX",
    branchCode: "001",
    reference: propertyId ? `PROP-${propertyId.slice(0, 8).toUpperCase()}` : "PROP-PAYMENT",
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard.`,
    });
  };

  const handleConfirmTransfer = () => {
    setConfirmed(true);
    toast({
      title: "Transfer Recorded",
      description: "We'll verify your payment within 24-48 hours.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16">
          <div className="container mx-auto px-4">
            <Link 
              to={propertyId ? `/properties/${propertyId}` : "/properties"} 
              className="inline-flex items-center text-white/80 hover:text-white mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Property
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <Building2 className="h-8 w-8" />
              Bank Transfer Payment
            </h1>
            {amount && (
              <p className="text-xl mt-2 opacity-90">
                Amount to Transfer: {formatCurrency(Number(amount))}
              </p>
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            {confirmed ? (
              <Card className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Transfer Confirmation Received!</h2>
                  <p className="text-muted-foreground mb-6">
                    We've recorded your bank transfer notification. Our team will verify the payment within 24-48 business hours and contact you via email or phone.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Reference: <span className="font-mono font-semibold">{bankDetails.reference}</span>
                  </p>
                  <Button asChild>
                    <Link to="/properties">Browse More Properties</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please transfer the exact amount and use the reference number provided. Your payment will be verified within 24-48 business hours.
                  </AlertDescription>
                </Alert>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Bank Account Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { label: "Bank Name", value: bankDetails.bankName },
                      { label: "Account Name", value: bankDetails.accountName },
                      { label: "Account Number", value: bankDetails.accountNumber },
                      { label: "SWIFT Code", value: bankDetails.swiftCode },
                      { label: "Branch Code", value: bankDetails.branchCode },
                      { label: "Payment Reference", value: bankDetails.reference, highlight: true },
                    ].map((item) => (
                      <div 
                        key={item.label}
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          item.highlight ? "bg-primary/10 border border-primary/20" : "bg-muted"
                        }`}
                      >
                        <div>
                          <p className="text-sm text-muted-foreground">{item.label}</p>
                          <p className={`font-medium ${item.highlight ? "text-primary font-mono" : ""}`}>
                            {item.value}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => copyToClipboard(item.value, item.label)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    {amount && (
                      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 mt-4">
                        <p className="text-sm text-muted-foreground">Amount to Transfer</p>
                        <p className="text-2xl font-bold text-primary">
                          {formatCurrency(Number(amount))}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Instructions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Copy the bank account details above</li>
                      <li>Log in to your bank's online/mobile banking platform</li>
                      <li>Initiate a transfer using the exact details provided</li>
                      <li>Use the <strong>Payment Reference</strong> as your transaction reference</li>
                      <li>Click the button below after completing your transfer</li>
                    </ol>
                  </CardContent>
                </Card>

                <Button 
                  onClick={handleConfirmTransfer}
                  className="w-full" 
                  size="lg"
                >
                  I've Completed the Bank Transfer
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BankTransferPage;
