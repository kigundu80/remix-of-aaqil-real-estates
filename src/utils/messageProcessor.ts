
import { useToast } from "@/hooks/use-toast";

// List of keywords and their corresponding automated responses
const autoResponses: Record<string, string> = {
  "property": "Thank you for your interest in our properties! We offer various residential and commercial properties across Uganda. Our team will contact you shortly with more information.",
  "price": "Our properties range in price depending on location, size, and amenities. We can provide you with detailed pricing information once we understand your specific needs.",
  "payment": "We accept various payment methods including bank transfers, mobile money, and installment plans. For more specific payment information, our team will reach out to you.",
  "location": "KAGGWA REAL ESTATES has properties in numerous locations across Uganda including Kampala, Entebbe, Jinja, and Mbarara. Please let us know which area you're interested in.",
  "tour": "We'd be happy to arrange a property tour for you! Our team will contact you to schedule a convenient time.",
  "document": "For property documentation, we ensure all our properties have clean titles. We'll guide you through the entire documentation process.",
  "land": "We offer various land options for both residential and commercial development. Our team can provide details on size, location, and pricing.",
  "contact": "Thank you for reaching out! Our team will contact you shortly. You can also reach us directly at +256 700 000 000."
};

// Default response when no keywords are matched
const defaultResponse = "Thank you for your message! Our team will get back to you shortly.";

export interface ProcessedMessage {
  original: string;
  automatic: boolean;
  response: string;
}

/**
 * Processes a message to generate an automatic response if possible
 * @param message The user's message
 * @returns An object containing the original message and automated response
 */
export const processMessage = (message: string): ProcessedMessage => {
  const lowerCaseMessage = message.toLowerCase();
  
  // Check if message contains any keywords
  for (const [keyword, response] of Object.entries(autoResponses)) {
    if (lowerCaseMessage.includes(keyword.toLowerCase())) {
      return {
        original: message,
        automatic: true,
        response
      };
    }
  }
  
  // Return default response if no keywords match
  return {
    original: message,
    automatic: true,
    response: defaultResponse
  };
};
