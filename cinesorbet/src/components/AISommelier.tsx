import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, User, HelpCircle, MessageSquare, ShieldAlert, Heart, Flame, Compass, HelpCircle as HelpIcon } from 'lucide-react';
import { UserRating, Movie } from '../types';

interface AISommelierProps {
  userRatings: UserRating[];
  selectedGenres: string[];
  onSelectMovieByTitle: (title: string) => void;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  recommendations?: any[];
}

const PRESET_MOODS = [
  { label: '🍷 Rich & Mind-Bending', prompt: 'I want a highly complex, deep sci-fi or thriller that bends reality and leaves me questioning everything.' },
  { label: '🌸 Sweet Peach Romance', prompt: 'Recommend a cozy, warm romantic comedy or drama with an exquisite vintage aesthetic and comforting endings.' },
  { label: '🍵 Comforting Anime Whimsy', prompt: 'Suggest a magical, comforting animation or fantasy filled with charming details and beautiful philosophy.' },
  { label: '🌶️ Intense Suspense flight', prompt: 'Suggest a fast-paced mystery or psychological puzzle with sudden twists and masterful directors.' },
];

export default function AISommelier({
  userRatings,
  selectedGenres,
  onSelectMovieByTitle,
}: AISommelierProps) {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: "Welcome to CineSorbet's Film Salon! I am your AI Film Sommelier. Describe your mood, current setting, or what you are craving, and I'll mix a custom 3-course film pairing. I'll even reference your active rating profile to keep things personalized!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setApiKeyError(null);
    const userMsg: AIMessage = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ratings: userRatings,
          genres: selectedGenres,
          prompt: textToSend,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === 'Missing API Key') {
          setApiKeyError(data.message);
        }
        throw new Error(data.message || 'Server error occurred during matchmaking');
      }

      if (data.success && data.recommendations) {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `Here is your customized cinematic tasting flight. I have hand-picked 3 distinct films that align with your request:`,
            recommendations: data.recommendations,
          },
        ]);
      } else {
        throw new Error('Could not parse recommendations from Gemini.');
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: err.message.includes('API_KEY') 
            ? "I wasn't able to contact Google AI Studio due to a missing API Key. However, our offline mathematical recommender engines are still fully operational!"
            : `Apologies, I encountered an issue preparing your tasting flight: ${err.message || 'Unknown error'}. Please try again shortly.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Preset Palate Selection & API status */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          
          {/* Preset Prompts Box */}
          <div className="p-6 rounded-3xl backdrop-blur-md bg-white/60 border border-orange-100/50 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#9E4A2A]" />
              <h3 className="text-sm font-bold text-[#3B1E30] uppercase font-sans tracking-wide">Quick Taste Prompts</h3>
            </div>
            <p className="text-xs text-[#7A5A6C] mb-4 leading-relaxed">
              Not sure what to ask? Select one of our pre-arranged sommelier requests to test the AI's matching:
            </p>
            <div className="space-y-2.5">
              {PRESET_MOODS.map((m) => (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => handleSendMessage(m.prompt)}
                  disabled={isLoading}
                  className="w-full text-left p-3 rounded-2xl bg-white/70 border border-orange-50/50 hover:bg-[#FFE6D9]/40 hover:border-[#FFD4C2]/50 text-xs font-semibold text-[#3B1E30] transition-all duration-200"
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* API Key Status Info panel */}
          {apiKeyError && (
            <div className="p-5 rounded-3xl bg-red-50/80 border border-red-100 shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-red-800">Gemini Key Needed</h4>
                  <p className="text-[11px] text-red-700 mt-1 leading-relaxed">
                    To enable live Gemini AI matchings, you can save your Gemini API Key in the AI Studio <strong>Settings &gt; Secrets</strong> panel. At runtime, the app proxy accesses it safely server-side.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="p-6 rounded-3xl backdrop-blur-md bg-white/60 border border-orange-100/50 shadow-md">
            <h4 className="text-xs font-bold text-[#3B1E30] uppercase tracking-wide mb-2">How It Learns</h4>
            <p className="text-[11px] text-[#7A5A6C] leading-relaxed">
              When you send a prompt, the AI Sommelier is provided with your current ratings and favorite genres in real-time. It evaluates our internal database of films alongside its global film knowledge to pair custom recommendations.
            </p>
          </div>

        </div>

        {/* Right Side: Conversation Chat Container */}
        <div className="lg:col-span-2 flex flex-col h-[560px] rounded-3xl backdrop-blur-md bg-white/60 border border-orange-100/50 shadow-lg shadow-orange-950/5 overflow-hidden">
          
          {/* Header */}
          <div className="p-4 bg-white/40 border-b border-orange-50/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FFE6D9] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#9E4A2A]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#3B1E30]">Gemini Film Matchmaker</h3>
                <span className="text-[9px] font-mono font-medium text-emerald-600 uppercase tracking-wide flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online Sommelier
                </span>
              </div>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 max-w-[85%] ${
                  m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    m.role === 'user'
                      ? 'bg-[#3B1E30] text-white'
                      : 'bg-gradient-to-tr from-[#FFE6D9] to-[#FFD4C2] text-[#9E4A2A]'
                  }`}
                >
                  {m.role === 'user' ? 'U' : 'AI'}
                </div>

                {/* Bubble content */}
                <div className="space-y-4">
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#3B1E30] text-white shadow-sm'
                        : 'bg-white/80 border border-orange-50/50 text-[#3B1E30] shadow-sm'
                    }`}
                  >
                    {m.content}
                  </div>

                  {/* If assistant response has customized movie recommendations */}
                  {m.recommendations && m.recommendations.length > 0 && (
                    <div className="grid grid-cols-1 gap-4 mt-2">
                      {m.recommendations.map((rec: any, recIdx: number) => (
                        <div
                          key={recIdx}
                          onClick={() => {
                            if (rec.isLocalMovie && rec.localMovieId) {
                              onSelectMovieByTitle(rec.title);
                            }
                          }}
                          className={`p-4 rounded-2xl bg-white border border-orange-100 shadow-sm transition-all duration-300 ${
                            rec.isLocalMovie ? 'hover:scale-[1.01] hover:border-purple-200 cursor-pointer' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <h4 className="text-xs font-bold text-[#3B1E30]">
                                {rec.title} <span className="font-normal text-[#7A5A6C]">({rec.year})</span>
                              </h4>
                              {rec.isLocalMovie && (
                                <span className="px-2 py-0.5 text-[8px] font-mono uppercase bg-[#EAE2F3] text-[#5D4275] font-bold rounded-full">
                                  In Sorbet DB
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFE6D9] text-[#9E4A2A] font-bold">
                              {rec.matchPercentage}% match
                            </span>
                          </div>
                          
                          <p className="text-[10px] font-mono text-[#7A5A6C] mb-2">
                            Directed by {rec.director} · {rec.genres?.join(', ')}
                          </p>

                          <p className="text-[11px] text-[#7A5A6C] mb-2 leading-relaxed italic">
                            "{rec.description}"
                          </p>

                          <div className="p-3 rounded-xl bg-orange-50/50 border border-orange-100/40 text-[11px] text-[#9E4A2A] font-serif leading-relaxed">
                            <strong>Sommelier Pairing Note:</strong> {rec.customReasoning}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFE6D9] to-[#FFD4C2] text-[#9E4A2A] flex items-center justify-center text-xs animate-pulse font-bold shrink-0">
                  AI
                </div>
                <div className="flex items-center gap-1 bg-white/80 border border-orange-50/50 p-4 rounded-2xl text-xs text-[#7A5A6C] shadow-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E4A2A] animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E4A2A] animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9E4A2A] animate-bounce" />
                  <span className="ml-1.5">Whisking recommendations...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Form input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-4 bg-white/40 border-t border-orange-50/50 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. A visual masterpiece of fantasy to sweep me away..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl bg-white border border-orange-100 text-xs focus:outline-none focus:ring-2 focus:ring-[#FFD4C2] text-[#3B1E30]"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-[#3B1E30] text-white hover:bg-[#522943] disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-xs flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
