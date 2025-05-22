
// Simplified sentiment analysis utility
// In a production app, this would ideally use a proper NLP library or API

export type SentimentType = 'positive' | 'neutral' | 'negative';

interface SentimentResult {
  sentiment: SentimentType;
  confidence: number;
  emoji: string;
}

// Lists of words that indicate different sentiments
const positiveWords = [
  'happy', 'good', 'great', 'excellent', 'wonderful', 'amazing', 'fantastic',
  'pleased', 'delighted', 'satisfied', 'joy', 'hope', 'love', 'appreciate',
  'thanks', 'thank you', 'grateful', 'excited', 'impressed', 'awesome'
];

const negativeWords = [
  'bad', 'terrible', 'awful', 'horrible', 'poor', 'disappointed', 'unhappy',
  'upset', 'angry', 'annoyed', 'frustrated', 'sad', 'hate', 'dislike',
  'complaint', 'issue', 'problem', 'fail', 'worse', 'worst', 'urgent', 'immediately'
];

/**
 * Analyze the sentiment of a message
 * @param text The message text to analyze
 * @returns The sentiment analysis result
 */
export const analyzeSentiment = (text: string): SentimentResult => {
  const lowerText = text.toLowerCase();
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  // Count occurrences of positive and negative words
  positiveWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) positiveScore += matches.length;
  });
  
  negativeWords.forEach(word => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const matches = lowerText.match(regex);
    if (matches) negativeScore += matches.length;
  });
  
  // Determine overall sentiment
  let sentiment: SentimentType = 'neutral';
  let emoji = '😐';
  
  if (positiveScore > negativeScore) {
    sentiment = 'positive';
    emoji = positiveScore >= 3 ? '😄' : '🙂';
  } else if (negativeScore > positiveScore) {
    sentiment = 'negative';
    emoji = negativeScore >= 3 ? '😠' : '🙁';
  }
  
  // Calculate confidence (simplistic approach)
  const totalScore = positiveScore + negativeScore;
  const confidence = totalScore === 0 ? 
    0.5 : // If no sentiment words found, confidence is neutral
    Math.min(0.95, Math.max(0.6, Math.abs(positiveScore - negativeScore) / totalScore));
  
  return {
    sentiment,
    confidence,
    emoji
  };
};

// Get appropriate Tailwind classes for sentiment
export const getSentimentStyles = (sentiment: SentimentType): {
  textColor: string;
  bgColor: string;
  borderColor: string;
} => {
  switch (sentiment) {
    case 'positive':
      return {
        textColor: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-950/30',
        borderColor: 'border-green-200 dark:border-green-800'
      };
    case 'negative':
      return {
        textColor: 'text-red-600 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-950/30',
        borderColor: 'border-red-200 dark:border-red-800'
      };
    default:
      return {
        textColor: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-950/30',
        borderColor: 'border-blue-200 dark:border-blue-800'
      };
  }
};
