
// Define priority types
export type MessagePriority = 'high' | 'medium' | 'low' | 'info';

// Utility function to determine priority based on subject or content keywords
export const determineMessagePriority = (message: { subject: string; message: string }): MessagePriority => {
  const urgentKeywords = ['urgent', 'emergency', 'immediately', 'asap', 'critical'];
  const mediumKeywords = ['important', 'attention', 'soon', 'follow up', 'reminder'];
  
  const fullText = `${message.subject} ${message.message}`.toLowerCase();
  
  if (urgentKeywords.some(keyword => fullText.includes(keyword))) {
    return 'high';
  } else if (mediumKeywords.some(keyword => fullText.includes(keyword))) {
    return 'medium';
  } else if (message.subject.toLowerCase().includes('inquiry')) {
    return 'info';
  } else {
    return 'low';
  }
};

// Get tailwind classes based on priority
export const getPriorityStyles = (priority: MessagePriority): {
  badgeClass: string;
  rowClass: string;
  iconColor: string;
} => {
  switch (priority) {
    case 'high':
      return {
        badgeClass: 'bg-red-500 hover:bg-red-600',
        rowClass: 'border-l-4 border-red-500',
        iconColor: 'text-red-500'
      };
    case 'medium':
      return {
        badgeClass: 'bg-amber-500 hover:bg-amber-600',
        rowClass: 'border-l-4 border-amber-500',
        iconColor: 'text-amber-500'
      };
    case 'info':
      return {
        badgeClass: 'bg-blue-500 hover:bg-blue-600',
        rowClass: 'border-l-4 border-blue-500',
        iconColor: 'text-blue-500'
      };
    default:
      return {
        badgeClass: 'bg-primary hover:bg-primary/80',
        rowClass: '',
        iconColor: 'text-blue-500'
      };
  }
};
