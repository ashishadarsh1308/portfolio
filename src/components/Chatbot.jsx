import React, { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

const SYSTEM_PROMPT = `You are an AI assistant representing Ashish Kumar Adarsh. 
You answer questions as if you are Ashish himself, in a confident, structured, and interview-ready manner.

CRITICAL INSTRUCTIONS - READ CAREFULLY:
1. KEEP ALL ANSWERS EXTREMELY SHORT AND TO THE POINT. Use 1-2 short sentences or concise bullet points. No long paragraphs.
2. If the user asks ANY question that is NOT related to Ashish Kumar Adarsh (e.g. general knowledge, coding help, weather, random topics), you MUST reply EXACTLY with: "Please ask about Ashish." Do NOT add any apologies or extra text. Only say "Please ask about Ashish."

----------------------------------------
👨‍💻 INTRODUCTION
I am Ashish Kumar Adarsh. I am pursuing M.Tech in CSE (Information Security) at NITK Surathkal (GPA: 7.69). B.Tech in CSE from SMIT (GPA: 8.47). I specialize in backend design, AI, and cybersecurity.

----------------------------------------
� EDUCATION
- M.Tech in Computer Science and Engineering (Information Security) from NITK Surathkal (GPA: 7.69).
- B.Tech in Computer Science and Engineering from Sikkim Manipal Institute of Technology (GPA: 8.47).
- Higher Secondary (Class XII): St. Michael's High School, CBSE, 76%.
- Secondary School (Class X): Modern Public School, CBSE, 95%.

----------------------------------------
🚀 PROJECTS
1. 5G-NSID: Built a realistic cyberattack dataset for 5G networks using Free5GC. Achieved 98% detection accuracy with ML models.
2. AI-Powered Job Portal: Full-stack platform using React, Node.js, and OpenAI API for intelligent resume parsing and job matching.

----------------------------------------
💼 EXPERIENCE
- Web Development Intern at FindFlames: Built scalable UI with React/Tailwind and integrated backend REST APIs with Firebase.

----------------------------------------
🧠 TECHNICAL SKILLS
Languages: C, C++, Python, JavaScript, SQL
ML: Random Forest, XGBoost, Scikit-learn
Web: React.js, Node.js, Express.js, JWT
Security: Network Slicing, IDS, Wireshark
DBs: MySQL, MongoDB, Firebase`;

const SUGGESTED_QUESTIONS = [
    "Tell me About Ashish.",
    "Ashish key skills.",
    "Education of Ashish."
];

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

let groq;
if (API_KEY) {
    groq = new Groq({ apiKey: API_KEY, dangerouslyAllowBrowser: true });
}

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

        if (!groq) {
            setMessages((prev) => [
                ...prev,
                { role: 'assistant', content: 'Error: Groq API key is not configured.' }
            ]);
            setIsLoading(false);
            return;
        }

        try {
            const chatHistory = messages.filter((m) => m.role !== 'system');
            const apiMessages = [
                { role: 'system', content: SYSTEM_PROMPT },
                ...chatHistory.map((m) => ({ role: m.role, content: m.content })),
                { role: 'user', content: userMessage.content }
            ];

            setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

            const stream = await groq.chat.completions.create({
                messages: apiMessages,
                model: 'llama-3.1-8b-instant',
                temperature: 0.2, // lowered temperature for more deterministic/strict format answering
                max_completion_tokens: 512,
                top_p: 1,
                stream: true,
            });

            let fullResponse = '';
            for await (const chunk of stream) {
                const delta = chunk.choices[0]?.delta?.content || "";
                fullResponse += delta;
                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].content = fullResponse;
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => {
                const newMessages = [...prev];
                if (newMessages[newMessages.length - 1].content === "") {
                    newMessages[newMessages.length - 1].content = "Oops! My servers are a bit busy right now. Please try again later.";
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
        <div className="fixed bottom-6 right-6 z-50">
            {/* Intro Popup Message */}
            {!isOpen && showPopup && (
                <div className="absolute bottom-20 right-0 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-4 animate-fade-in-up flex flex-col gap-2 rounded-br-none cursor-pointer hover:-translate-y-1 transition-transform"
                    onClick={handleOpenChat}>
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-1.5 rounded-full text-indigo-600 dark:text-indigo-400">
                                <Bot size={16} />
                            </div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">AI Assistant</p>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowPopup(false); }}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                            <X size={14} />
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                        Hi! 👋 Should I introduce you to Ashish?
                    </p>
                </div>
            )}

            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={handleOpenChat}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:scale-110 flex items-center justify-center animate-bounce duration-300"
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white dark:bg-gray-900 w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] rounded-2xl shadow-2xl flex flex-col border border-gray-200 dark:border-gray-800 transition-all overflow-hidden rounded-bl-none">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 text-white p-4 flex justify-between items-center z-10 shadow-sm rounded-t-2xl">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white/20 p-2 rounded-full relative">
                                <Bot size={22} />
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-indigo-600 rounded-full"></span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-[15px] leading-tight">Ashish AI</h3>
                                <p className="text-xs font-medium text-indigo-100/90 tracking-wide mt-0.5">Online & Ready</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-[#0a0a0a]">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'
                                    } animate-fade-in`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl p-3.5 text-[14px] leading-relaxed shadow-sm flex flex-col ${msg.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-sm'
                                        : 'bg-white dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700/50 rounded-tl-sm'
                                        }`}
                                >
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                </div>
                            </div>
                        ))}

                        {/* Quick Suggestions (FAQ) */}
                        {!isLoading && messages.length < 3 && (
                            <div className="flex flex-col gap-2 mt-4 items-start">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 pl-1 uppercase tracking-wider">Suggested</p>
                                <div className="flex flex-wrap gap-2">
                                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => sendMessage(q)}
                                            className="text-left text-xs bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30 px-3 py-2 rounded-xl transition-colors shadow-sm"
                                        >
                                            {q}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700">
                                    <div className="flex space-x-1.5 items-center justify-center">
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-10 shadow-[0_-4px_15px_rgba(0,0,0,0.03)] dark:shadow-none">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-full py-3.5 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all shadow-inner h-12"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="absolute right-1.5 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors flex items-center justify-center w-9 h-9"
                            >
                                <Send size={15} className="ml-0.5" />
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <span className="text-[10px] text-gray-400 dark:text-gray-500">AI-generated • Groq Engine</span>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
