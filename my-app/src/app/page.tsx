'use client';

import { FC, useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HiPaperAirplane } from "react-icons/hi"; 
import Image from "next/image";

const Home: FC = () => {
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([
        { text: "Hi!", sender: 'user' },
        { text: "Hello! How can I help you today?", sender: 'bot' },
    ]);
    const [inputText, setInputText] = useState("");
    const heroRef = useRef<HTMLDivElement>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(heroRef.current, { x: -100 }, { x: 0, duration: 1.5, ease: "power3.out" });
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            gsap.fromTo(chatRef.current, { opacity: 0, x: 100 }, { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (inputText.trim()) {
            setMessages((prev) => [...prev, { text: inputText, sender: 'user' }]);
            setInputText("");

            try {
                const response = await fetch('http://127.0.0.1:5000/chat_gen', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: inputText }),
                });

                const data = await response.json();
                setMessages((prev) => [...prev, { text: data.ans, sender: 'bot' }]);
            } catch (error) {
                console.error("Error sending message to backend:", error);
            }
        }
    };

    return (
        <div
            className="h-[220vh] bg-gradient-to-br from-gray-800 to-black relative overflow-hidden"
            style={{
                backgroundImage: `url(https://wallpapers.com/images/hd/math-background-93eq771f5ks3jo3v.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="flex h-[100vh] pt-24">
                {/* Hero Text */}
                <div ref={heroRef} className="w-2/3 flex flex-col items-center justify-center text-center px-6">
                    <h1 className="text-7xl font-extrabold text-teal-400 shadow-lg drop-shadow-lg">
                        Unlock Knowledge Instantly with Your AI-Powered Guide!
                    </h1>
                </div>

                {/* Chatbot */}
                <div className="fixed right-8 bottom-8 w-[420px] h-[calc(100%-6rem-30px)] rounded-lg p-6 flex flex-col bg-gray-900 bg-opacity-90 backdrop-blur-lg border border-teal-400 shadow-lg transition-transform duration-300 hover:scale-105"
                     style={{
                         boxShadow: '0 0 20px rgba(0, 204, 204, 0.8), 0 0 30px rgba(0, 204, 204, 0.7), 0 0 40px rgba(0, 204, 204, 0.6)',
                     }}>
                    <h2 className="text-xl font-bold text-white mb-4">Ask:</h2>
                    <div ref={chatRef} className="flex-grow overflow-y-auto bg-white/10 p-4 rounded-lg mb-4 backdrop-blur-md">
                        {/* Chat Messages */}
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-xs transition-transform duration-300 ${msg.sender === 'user' ? 'bg-teal-400 text-black transform hover:scale-105' : 'bg-gray-700 text-white transform hover:scale-105'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="flex-grow p-3 border rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-300 transition-shadow duration-200"
                            placeholder="Type your message..."
                        />
                        <div className="ml-2">
                            <button
                                onClick={handleSendMessage}
                                className="bg-gradient-to-r from-teal-400 to-blue-500 text-white px-4 py-3 rounded-lg transition-transform duration-200 transform hover:scale-105 flex items-center"
                            >
                                <HiPaperAirplane className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description Section */}
            <div ref={descriptionRef} className="absolute w-1/2 mx-auto top-[80vh] left-16 p-6">
                <div className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105"
                    style={{
                        border: '1px solid rgba(0, 204, 204, 0.6)',
                        boxShadow: '0 0 20px rgba(0, 204, 204, 0.8), 0 0 30px rgba(0, 204, 204, 0.7), 0 0 40px rgba(0, 204, 204, 0.6)',
                    }}
                >
                    <h2 className="text-4xl font-bold text-white mb-2">Description</h2>
                    <p className="mt-4 text-xl leading-relaxed text-gray-300">
                        This knowledge AI bot app is designed to empower users with instant access to information across various topics, offering a seamless and interactive learning experience. With advanced AI capabilities, users can ask questions, explore complex concepts, and receive tailored explanations that cater to their individual learning needs.
                        <br /><br />
                        Example prompts include:
                        <br /><br />
                        👉“What are the key principles of effective communication?”<br />
                        👉“Can you summarize the theory of relativity?”<br />
                        👉“What are the latest trends in renewable energy?”<br />
                        👉“How can I improve my time management skills?”<br />
                        👉“What’s the significance of emotional intelligence in the workplace?”<br />
                        👉“Can you provide tips for successful public speaking?”<br />
                        <br />
                        This app aims to make knowledge accessible and engaging, breaking down barriers to understanding while fostering a thirst for learning. By leveraging AI to deliver immediate support and insights, it empowers users to enhance their knowledge and confidence across diverse subjects, paving the way for personal and professional growth.
                    </p>
                </div>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="text-center">
                    <p className="text-white text-xl flex items-center justify-center">
                        <span className="px-2">Powered by</span>
                        <Image
                            src="https://www.gaianet.ai/images/logo.png"
                            alt="Description of image"
                            width={50}
                            height={30}
                        />
                    </p>
                </div>
            </footer>

            <style jsx>{`
                .blinking {
                    animation: blinkingText 1.5s infinite;
                }

                @keyframes blinkingText {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default Home;
