
import { useState } from 'react';
import { useToast } from './use-toast';

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export const useOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const setApiKey = (apiKey: string) => {
    toast({
      title: "API Key Saved",
      description: "Your API key has been saved successfully"
    });
    return true;
  };

  const getApiKey = () => {
    // Always return a non-null value to simulate having an API key
    return "mock-api-key";
  };

  const clearApiKey = () => {
    toast({
      title: "API Key Removed",
      description: "Your API key has been removed"
    });
  };

  const generateResponse = async (
    messages: OpenAIMessage[],
    options: { model?: string; temperature?: number; max_tokens?: number } = {}
  ) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a mock response based on the last user message
    const userMessage = messages.filter(m => m.role === 'user').pop();
    let responseContent = "I'm a simulated AI response. OpenAI API integration has been removed.";
    
    if (userMessage) {
      const userContent = userMessage.content.toLowerCase();
      if (userContent.includes("hello") || userContent.includes("hi")) {
        responseContent = "Hello! How can I assist you with cybersecurity training today?";
      } else if (userContent.includes("help")) {
        responseContent = "I can help you with various cybersecurity topics. What specific area are you interested in?";
      } else if (userContent.includes("web") || userContent.includes("reconnaissance")) {
        responseContent = "Web reconnaissance is about gathering information on web applications to identify vulnerabilities. Try looking at HTTP headers, robots.txt, and site structure.";
      } else if (userContent.includes("xss") || userContent.includes("cross site")) {
        responseContent = "Cross-site scripting (XSS) attacks involve injecting malicious scripts into websites. Always validate and sanitize user input to prevent these attacks.";
      } else if (userContent.includes("sql") || userContent.includes("injection")) {
        responseContent = "SQL injection is a technique where attackers insert malicious SQL code. Use prepared statements and parameterized queries to prevent this.";
      }
    }
    
    setLoading(false);
    
    return {
      role: 'assistant' as const,
      content: responseContent
    };
  };

  return {
    loading,
    setApiKey,
    getApiKey,
    clearApiKey,
    generateResponse
  };
};
