
import { toast } from "@/hooks/use-toast";

// Types for OpenAI requests
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAICompletionRequest {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface OpenAICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: OpenAIMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// OpenAI Service class
class OpenAIService {
  private apiKey: string | null = null;
  private baseUrl = 'https://api.openai.com/v1';
  private defaultModel = 'gpt-4o-mini';

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    // Store in localStorage for persistence
    localStorage.setItem('openai_api_key', apiKey);
    return true;
  }

  getApiKey(): string | null {
    if (!this.apiKey) {
      // Try to get from localStorage
      const storedKey = localStorage.getItem('openai_api_key');
      if (storedKey) {
        this.apiKey = storedKey;
      }
    }
    return this.apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem('openai_api_key');
  }

  async createChatCompletion(
    messages: OpenAIMessage[],
    options: { model?: string; temperature?: number; max_tokens?: number } = {}
  ): Promise<OpenAIMessage | null> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please set your OpenAI API key in the settings",
        variant: "destructive"
      });
      return null;
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: options.model || this.defaultModel,
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.max_tokens
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Failed to connect to OpenAI API');
      }

      const data: OpenAICompletionResponse = await response.json();
      return data.choices[0].message;
    } catch (error: any) {
      toast({
        title: "AI Request Failed",
        description: error.message || "Something went wrong",
        variant: "destructive"
      });
      console.error('OpenAI API Error:', error);
      return null;
    }
  }
}

// Export a singleton instance
export const openaiService = new OpenAIService();
