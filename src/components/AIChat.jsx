import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const placeholderAIService = (message) => {
  const responses = {
    'keyword research': 'To conduct effective keyword research, start by brainstorming topics relevant to your business. Then, use tools like Google Keyword Planner or SEMrush to find related keywords and analyze their search volume and competition.',
    'backlinks': 'Building high-quality backlinks is crucial for SEO. Focus on creating valuable content that others want to link to, reach out to industry influencers, and consider guest posting on reputable sites in your niche.',
    'content optimization': 'To optimize your content for SEO, ensure you\'re using relevant keywords naturally throughout your text. Also, focus on creating high-quality, informative content that provides value to your readers. Don\'t forget to optimize your meta tags and include internal links.',
    'default': 'I\'m sorry, I don\'t have specific information about that. Could you try rephrasing your question or asking about keyword research, backlinks, or content optimization?'
  };

  const lowerMessage = message.toLowerCase();
  for (const [key, value] of Object.entries(responses)) {
    if (lowerMessage.includes(key)) {
      return value;
    }
  }
  return responses.default;
};

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      
      const aiResponse = { text: placeholderAIService(input), sender: 'ai' };
      setTimeout(() => {
        setMessages((prev) => [...prev, aiResponse]);
      }, 500);
      
      setInput('');
    }
  };

  return (
    <Card className="w-96 h-[500px] flex flex-col">
      <CardHeader>
        <CardTitle>AI Chat Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <ScrollArea className="flex-grow mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-2 p-2 rounded ${
                message.sender === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
              }`}
              style={{ maxWidth: '80%' }}
            >
              {message.text}
            </div>
          ))}
        </ScrollArea>
        <div className="flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-grow mr-2"
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;
