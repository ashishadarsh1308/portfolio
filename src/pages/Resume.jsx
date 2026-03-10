import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Resume = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // NOTE: This should ideally be replaced with a direct download link (e.g., raw PDF link) 
    // or the actual Drive sharing link if intended just for viewing.
    const driveLink = "https://drive.google.com/file/d/167r3YYob5OtuoR0RUzhDiuNn0t2jnG5g/view?usp=sharing"; // The user didn't specify the link yet, but requested the button.

    return (
        <section className="min-h-screen pt-32 pb-20 bg-gray-950 flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 mb-6">
                        My Resume
                    </h1>
                    <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12">
                        A detailed overview of my academic background, technical skills, and professional experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        {/* Download / View Button */}
                        <a
                            href={driveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-indigo-600 rounded-2xl hover:bg-indigo-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
                            <svg className="w-5 h-5 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span className="relative">Download / View Resume</span>
                        </a>

                        {/* Back to Home Button */}
                        <a
                            href="/"
                            className="inline-flex items-center justify-center px-8 py-4 font-bold text-gray-300 transition-all duration-300 bg-transparent border border-gray-700 rounded-2xl hover:bg-white/5 hover:text-white w-full sm:w-auto"
                        >
                            Back to Portfolio
                        </a>
                    </div>
                </motion.div>

                {/* Decorative Resume Preview Frame */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 relative mx-auto w-full max-w-3xl aspect-[1/1.4] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 group-hover:scale-105 transition-transform duration-700"></div>
                    <img src="https://res.cloudinary.com/ds3t0xxe9/image/upload/v1773160763/Screenshot_2026-03-10_220631_kp6l5u.png" alt="" />
                </motion.div>
            </div>
        </section>
    );
};

export default Resume;
