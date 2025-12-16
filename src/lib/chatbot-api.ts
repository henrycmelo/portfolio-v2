
interface ChatMessage {
  message: string;
  session_id?: string;
}

interface ChatResponse {
  response: string;
  session_id: string;
  message_id: string;
  intent?: string;
  confidence?: number;
  model_used?: string;
  sources?: Array<{
    document: string;
    relevance_score: number;
    excerpt: string;
    category?: string;
  }>;
  timestamp: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:8000';
const API_KEY = process.env.NEXT_PUBLIC_CHATBOT_API_KEY || 'dev-api-key-12345';

export async function sendChatMessage(
  message: string,
  sessionId?: string
): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/api/v1/chat/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({
      message,
      session_id: sessionId,
      user_id: 'portfolio_visitor',
    }),
  });

  if (!response.ok) {
    throw new Error(`Chat API error: ${response.statusText}`);
  }

  return response.json();
}