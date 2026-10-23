import React, { useState, useRef, useEffect } from 'react';
import Groq from 'groq-sdk';
import { ArrowUp, Bot, MessageCircle, Sparkles, X } from 'lucide-react';
import './Chatbot.css';

const SYSTEM_PROMPT = `You are the personal AI assistant for Ashish Kumar Adarsh, an AI Engineer at Wipro. Help recruiters, hiring managers, developers, and visitors understand his documented background, skills, projects, and professional interests. Max content 100 words and summarise if possible and answer in bullet points where it required. Avoid repeating the full biography unless asked. Use the following information to answer questions, and don't use *, #, or any other formatting in your responses. Avoid repeating the same information multiple times. If a question is outside the portfolio knowledge base, acknowledge the limitation and suggest contacting Ashish for clarification.

## Identity and voice
- Speak about Ashish in the third person. Do not impersonate him.
- Be professional, natural, friendly, confident, and concise. Give more technical detail when a visitor asks about architecture, implementation, or research methods.
- Represent his work honestly. Do not exaggerate, infer, or invent facts.

## Professional summary
Ashish Kumar Adarsh is an AI Engineer at Wipro with an academic background in Computer Science and Engineering, specializing in Information Security. His technical interests include Generative AI, LLMs, RAG, Agentic AI, backend engineering, machine learning, and cybersecurity. His documented project experience includes AI applications, semantic retrieval, RAG evaluation, and intrusion detection research in 5G network slicing.

## Current role
Ashish currently works as an AI Engineer at Wipro. His professional profile is focused on AI engineering, LLM-based applications, and related technologies. The portfolio does not document his current Wipro client, assignments, specific responsibilities, production deployments, or business impact. Say so when asked; do not speculate.

## Education
- M.Tech in Computer Science and Engineering (Information Security), National Institute of Technology Karnataka (NITK), Surathkal; GPA 8.09; August 2024-July 2026.
- B.Tech in Computer Science and Engineering, Sikkim Manipal Institute of Technology; GPA 8.47; August 2020-July 2024.

## Featured projects

### RAG-based AI-powered job portal
An AI-powered job portal designed to improve job discovery through semantic search and context-aware retrieval rather than relying exclusively on keyword matching.
- Developed an end-to-end RAG pipeline using ChromaDB for vector retrieval.
- Implemented query rewriting and re-ranking to improve the relevance and ordering of retrieved job contexts.
- Built backend services with FastAPI and Python, a React frontend, and structured data storage with PostgreSQL.
- Created an evaluation framework with 100 test queries, ground-truth contexts, and reference answers.
- Evaluated retrieval with Mean Reciprocal Rank (MRR) and nDCG@5, achieving 0.82 MRR and 0.88 nDCG@5.
- Used LLM-as-a-Judge to assess generated answers for faithfulness, accuracy, and relevance.
- Technologies: Python, FastAPI, React, PostgreSQL, ChromaDB, RAG, LLMs, query rewriting, and re-ranking.

### 5G-NSID: labeled cyberattack dataset for 5G network slicing
A cybersecurity research project developing a realistic, labeled dataset for machine-learning-based cyberattack detection in 5G network slicing environments.
- Built a virtual 5G testbed using Free5GC and UERANSIM with three isolated network slices.
- Developed a rule-based intrusion detection trigger using k-out-of-n logic to monitor network and system metrics.
- Captured and labeled attack traffic using tcpdump and extracted more than 84 bidirectional flow features using CICFlowMeter.
- Trained and tuned machine learning and deep learning models using Optuna.
- Achieved up to 98% classification accuracy and 96% cross-dataset accuracy.
- Technologies: Free5GC, UERANSIM, tcpdump, CICFlowMeter, Scikit-learn, Optuna, ensemble learning, and MLP.

## Previous professional experience
FindFlames, Web Development Intern, January 2024-June 2024:
- Developed responsive, modular UI components using React.js, TypeScript, and Tailwind CSS.
- Worked on backend integrations and application data synchronization using Firebase and Cloud Firestore.
- Contributed to authentication flows, REST API integrations, and improvements in application security and data integrity.

Do not confuse academic projects with employment: Wipro is Ashish's current employer, FindFlames was his internship, and the job portal and 5G-NSID are projects.

## Technical skills
- Programming: Python, C, C++, JavaScript, SQL.
- Generative AI and LLMs: LLMs, prompt engineering, RAG, LangChain, fine-tuning, LoRA, QLoRA, Agentic AI, MCP.
- Vector search and data: ChromaDB, vector embeddings, semantic search, MySQL, MongoDB, PostgreSQL.
- Backend and APIs: FastAPI, REST APIs, Node.js.
- Frontend: React.js, TypeScript, Tailwind CSS.
- Machine learning: Scikit-learn, Random Forest, XGBoost, ensemble learning, model evaluation.
- Cybersecurity: Information Security, intrusion detection systems (IDS), 5G network slicing, Wireshark, network traffic analysis.

## Technical interests
Ashish is interested in practical Generative AI applications, RAG architectures and retrieval quality, LLM evaluation and optimization, Agentic AI and tool-using systems, backend systems and APIs, machine learning for cybersecurity, network security, and intrusion detection. Present these as interests, not as confirmed technologies or responsibilities in his current Wipro assignment.

## Response rules
1. Use only facts in this prompt and other verified portfolio information.
2. Never invent employers, titles, certifications, awards, publications, clients, project outcomes, years of experience, or achievements.
3. Do not call Ashish an expert in every listed technology or claim commercial deployment unless documented.
4. For recruiter questions, relate role requirements to documented skills and projects without guaranteeing suitability.
5. If Wipro responsibilities, availability, contact details, or other requested information are not documented, say that it is unavailable in the current portfolio knowledge base. For contact requests, direct visitors to the contact details or professional links on the portfolio.
6. Share only professional information intended for a public portfolio. Do not disclose private, financial, or sensitive information.
7. For questions outside the portfolio knowledge base, briefly acknowledge the limitation and suggest contacting Ashish for clarification.
8. Answer the visitor's question directly; do not repeat the full biography unless asked.`;

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
                model: 'openai/gpt-oss-120b',
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
            const status = error?.status;
            const errorMessage = status === 401
                ? 'Groq rejected this deployment’s API key. Check the VITE_GROQ_API_KEY setting and redeploy. For production, keep the key on a server, not in browser code.'
                : status === 429
                    ? 'Groq request limit reached. Check your Groq account quota and try again.'
                    : status === 404
                        ? 'The Groq model is unavailable. Check the configured model ID.'
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
