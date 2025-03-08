
import { useState } from 'react';
import { openaiService, OpenAIMessage } from '@/services/openai';
import { useToast } from './use-toast';

export const useOpenAI = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const setApiKey = (apiKey: string) => {
    if (!apiKey.trim().startsWith('sk-')) {
      toast({
        title: "Invalid API Key",
        description: "Your API key should start with 'sk-'",
        variant: "destructive"
      });
      return false;
    }
    
    const success = openaiService.setApiKey(apiKey);
    if (success) {
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved successfully"
      });
    }
    return success;
  };

  const getApiKey = () => {
    return openaiService.getApiKey();
  };

  const clearApiKey = () => {
    openaiService.clearApiKey();
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed"
    });
  };

  const generateResponse = async (
    messages: OpenAIMessage[],
    options: { model?: string; temperature?: number; max_tokens?: number } = {}
  ) => {
    setLoading(true);
    try {
      const response = await openaiService.createChatCompletion(messages, options);
      setLoading(false);
      
      if (!response) {
        toast({
          title: "AI Response Failed",
          description: "Could not generate a response. Please check your API key and try again.",
          variant: "destructive"
        });
      }
      
      return response;
    } catch (error) {
      console.error("Error generating response:", error);
      toast({
        title: "AI Response Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    setApiKey,
    getApiKey,
    clearApiKey,
    generateResponse
  };
};
