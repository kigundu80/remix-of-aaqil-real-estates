
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Bot } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { processMessage } from "@/utils/messageProcessor";

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [showBotResponse, setShowBotResponse] = useState(false);
  const [botResponse, setBotResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Reset bot response when user types a new message
    if (id === "message" && showBotResponse) {
      setShowBotResponse(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process the message to get an automated response
    const processed = processMessage(formData.message);
    setBotResponse(processed.response);
    setShowBotResponse(true);
    
    // Construct mailto URL with form data
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    );
    
    // Open email client with pre-filled data
    window.location.href = `mailto:karmaramak@gmail.com?subject=${subject}&body=${body}`;
    
    // Show success message
    toast({
      title: "Message Sent",
      description: "Your message has been sent. We'll get back to you soon!",
      variant: "default",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to start your property journey? Reach out to our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Send Us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="How can we help you?"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about what you're looking for..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              {showBotResponse && (
                <div className="mb-4 bg-blue-50 p-4 rounded-md border border-blue-100">
                  <div className="flex items-center mb-2">
                    <Bot className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="font-medium">Automatic Response:</span>
                  </div>
                  <p className="text-gray-700">{botResponse}</p>
                </div>
              )}

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-hm-green text-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>123 Kampala Road, Kampala, Uganda</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>+256 700 000 000</p>
                    <p>+256 780 000 000</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p><a href="mailto:karmaramak@gmail.com" className="hover:underline">karmaramak@gmail.com</a></p>
                    <p><a href="mailto:karmaramak@gmail.com" className="hover:underline">sales@kagwarealestate.com</a></p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 mt-1" />
                  <div>
                    <p className="font-semibold">Opening Hours</p>
                    <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden h-64 shadow-md">
              {/* Placeholder for Google Map - in a real app, this would be a Google Maps component */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <p className="text-gray-600">Google Map would appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
