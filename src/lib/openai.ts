const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export async function summarizeText(text: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes event descriptions concisely while preserving important details.'
        },
        {
          role: 'user',
          content: `Please summarize this event description in 2-3 sentences: ${text}`
        }
      ],
      max_tokens: 150,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to summarize text with AI');
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || text;
}