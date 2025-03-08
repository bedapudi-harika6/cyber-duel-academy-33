
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
  private availableModels = ['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'];

  setApiKey(apiKey: string) {
    if (!apiKey.trim()) {
      console.error('API key cannot be empty');
      return false;
    }
    
    this.apiKey = apiKey.trim();
    // Store in localStorage for persistence
    localStorage.setItem('openai_api_key', this.apiKey);
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

    // Validate model
    const model = options.model || this.defaultModel;
    if (!this.availableModels.includes(model)) {
      console.warn(`Model ${model} not in the list of available models. Using ${this.defaultModel} instead.`);
    }

    try {
      console.log(`Sending request to OpenAI with model: ${model}`);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.max_tokens
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("OpenAI API Error:", errorData);
        const errorMessage = errorData.error?.message || `API Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const data: OpenAICompletionResponse = await response.json();
      console.log("OpenAI response received:", data.choices[0].message);
      return data.choices[0].message;
    } catch (error: any) {
      console.error('OpenAI API Error:', error);
      throw error;
    }
  }
  
  // Helper method to validate API key format
  validateApiKey(apiKey: string): boolean {
    return apiKey.trim().startsWith('sk-') && apiKey.trim().length > 15;
  }
}

// Export a singleton instance
export const openaiService = new OpenAIService();
