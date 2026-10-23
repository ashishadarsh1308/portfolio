import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, Bot, MessageCircle, Sparkles, X } from 'lucide-react';
import './Chatbot.css';

const SUGGESTED_QUESTIONS = [
    "Tell me About Ashish.",
    "Ashish key skills.",
    "Education of Ashish."
];

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hi! I am the AI assistant for Ashish Kumar Adarsh. Ask me anything about his skills, experience or projects!' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Show the intro popup after 2.5 seconds
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleOpenChat = () => {
        setIsOpen(true);
        setShowPopup(false); // Hide the welcome prompt once chat opens
    };

    const sendMessage = async (text) => {
        if (!text.trim() || isLoading) return;

        const userMessage = { role: 'user', content: text.trim() };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const chatHistory = messages.filter((m) => m.role !== 'system');
            const apiMessages = [
                ...chatHistory.map((m) => ({ role: m.role, content: m.content })),
                { role: 'user', content: userMessage.content }
            ];

            setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages })
            });

            const result = await response.json();
            if (!response.ok) {
                const error = new Error(result.error || 'Chat request failed.');
                error.status = response.status;
                throw error;
            }

            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content = result.content;
                return newMessages;
            });
        } catch (error) {
            console.error("Chat error:", error);
            const status = error?.status;
            const errorMessage = status === 401
                ? 'The server rejected its Groq API key. Check the GROQ_API_KEY setting in Vercel and redeploy.'
                : status === 429
                    ? 'Groq request limit reached. Check your Groq account quota and try again.'
                    : status === 404
                        ? 'The Groq model is unavailable. Check the configured model ID.'
                        : status === 500
                            ? 'The chat service is not configured. Add GROQ_API_KEY to the Vercel project settings and redeploy.'
                            : 'Oops! My servers are a bit busy right now. Please try again later.';
            setMessages((prev) => {
                const newMessages = [...prev];
                if (newMessages[newMessages.length - 1].content === "") {
                    newMessages[newMessages.length - 1].content = errorMessage;
                }
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <div className="portfolio-chat">
            {!isOpen && showPopup && (
                <div className="chat-teaser" role="status">
                    <button
                        type="button"
                        className="chat-teaser-close"
                        onClick={() => setShowPopup(false)}
                        aria-label="Dismiss chat invitation"
                    >
                        <X size={15} />
                    </button>
                    <span className="chat-teaser-kicker"><Sparkles size={13} /> Portfolio assistant</span>
                    <p>Curious about Ashish&apos;s work?</p>
                    <button type="button" className="chat-teaser-link" onClick={handleOpenChat}>
                        Start a conversation <span aria-hidden="true">↗</span>
                    </button>
                </div>
            )}

            {!isOpen && (
                <button
                    type="button"
                    onClick={handleOpenChat}
                    className="chat-launcher"
                    aria-label="Open portfolio assistant"
                    title="Ask about Ashish"
                >
                    <MessageCircle size={23} strokeWidth={1.8} />
                    <span className="chat-launcher-dot" />
                </button>
            )}

            {isOpen && (
                <section className="chat-panel" aria-label="Chat with Ashish's portfolio assistant">
                    <header className="chat-header">
                        <div className="chat-header-main">
                            <div className="chat-avatar"><Bot size={22} strokeWidth={1.7} /></div>
                            <div>
                                <p className="chat-eyebrow">ASHISH KUMAR ADARSH</p>
                                <h2>Portfolio assistant</h2>
                                <p className="chat-status"><span /> Here to help you explore</p>
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="chat-close"
                            aria-label="Close chat"
                            title="Close chat"
                        >
                            <X size={19} />
                        </button>
                    </header>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`chat-message-row ${msg.role === 'user' ? 'is-user' : 'is-assistant'}`}>
                                {msg.role !== 'user' && <span className="chat-message-avatar"><Sparkles size={13} /></span>}
                                <div className={`chat-message ${msg.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}

                        {!isLoading && messages.length < 3 && (
                            <div className="chat-suggestions">
                                <p>EXPLORE</p>
                                {SUGGESTED_QUESTIONS.map((question) => (
                                    <button type="button" key={question} onClick={() => sendMessage(question)}>
                                        {question}<span aria-hidden="true">↗</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {isLoading && (
                            <div className="chat-message-row is-assistant" aria-label="Assistant is responding">
                                <span className="chat-message-avatar"><Sparkles size={13} /></span>
                                <div className="chat-message chat-message-assistant chat-typing">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSubmit} className="chat-composer">
                        <label className="chat-input-wrap">
                            <span className="sr-only">Ask a question</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(event) => setInput(event.target.value)}
                                placeholder="Ask about projects, skills..."
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                aria-label="Send message"
                                title="Send message"
                            >
                                <ArrowUp size={19} strokeWidth={2.2} />
                            </button>
                        </label>
                        <p className="chat-disclaimer">AI-generated responses · Based on portfolio information</p>
                    </form>
                </section>
            )}
        </div>
    );
};

export default Chatbot;
