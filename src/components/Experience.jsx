import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import experienceData from '../data/experience.json';

const Experience = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // 1. Scroll-linked progress for the vertical line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Smooth out the scroll progress
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section
            ref={containerRef}
            id="experience"
            className="py-20 bg-gradient-to-b from-[#0b0f2a] via-[#0b1b2f] to-[#070b1c] border-t border-gray-800 overflow-hidden relative"
        >
            {/* Star particles overlay */}
            <div className="absolute inset-0 opacity-40 pointer-events-none
                [background-image:radial-gradient(white_1px,transparent_1px)]
                [background-size:35px_35px] z-0"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">

                {/* soft glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none z-0"></div>

                {/* 2. THE GLOWING TIMELINE LINE (Desktop) */}
                <div className="hidden md:block absolute left-[8px] top-[180px] bottom-0 w-[2px] bg-gray-800/50">
                    <motion.div
                        style={{ scaleY, transformOrigin: "top" }}
                        className="w-full h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                        Experience
                    </h2>
                    <p className="mt-4 text-xl text-gray-400">
                        My professional journey and roles.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {experienceData.map((exp, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="relative pl-8 md:pl-12 group"
                        >
                            {/* Mobile Line */}
                            <div className="md:hidden absolute left-0 top-0 bottom-0 w-px bg-gray-800"></div>

                            {/* 3. PULSING DOT */}
                            <div className="absolute left-[-6px] md:left-[2px] top-2 z-20">
                                <div className="w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.9)] transition-all duration-300 group-hover:scale-150 group-hover:bg-purple-400"></div>
                                <div className="absolute inset-0 w-3 h-3 bg-indigo-400 rounded-full animate-ping opacity-40"></div>
                            </div>

                            <Tilt
                                tiltMaxAngleX={8}
                                tiltMaxAngleY={8}
                                scale={1.01}
                                transitionSpeed={2000}
                                className="w-full"
                            >
                                {/* Experience Card */}
                                <div
                                    onMouseMove={handleMouseMove}
                                    className="relative group/exp overflow-hidden bg-gray-900/60 border border-gray-800 p-6 rounded-2xl
                                    transition-all duration-500
                                    hover:border-indigo-400/30
                                    shadow-lg hover:shadow-indigo-500/10"
                                >
                                    {/* Cursor Glow */}
                                    <div
                                        className="pointer-events-none absolute inset-0 opacity-0 group-hover/exp:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.1), transparent 40%)`
                                        }}
                                    />

                                    {/* Soft Hover Bg */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-cyan-600/5 opacity-0 group-hover/exp:opacity-100 transition-opacity duration-500"></div>

                                    {/* Content Layer */}
                                    <div className="relative z-10">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                            <div className="flex items-center mb-4 md:mb-0">
                                                {exp.logo ? (
                                                    <img
                                                        src={exp.logo}
                                                        alt={`${exp.company} logo`}
                                                        className="w-14 h-14 rounded-full mr-5 border-2 border-indigo-500/30 object-cover shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-full mr-5 border-2 border-gray-700 bg-gray-800 flex items-center justify-center text-gray-400 font-bold text-xl shrink-0">
                                                        {exp.company.charAt(0)}
                                                    </div>
                                                )}

                                                <div>
                                                    <h3 className="text-xl font-bold text-white group-hover/exp:text-indigo-300 transition-colors">
                                                        {exp.title}
                                                    </h3>
                                                    <div className="text-lg font-medium text-gray-300 mt-1">
                                                        {exp.company}
                                                        <span className="text-sm font-normal text-gray-500 ml-2">
                                                            ({exp.type})
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-2 md:mt-0 text-left md:text-right">
                                                <div className="text-sm font-semibold text-indigo-400 bg-indigo-500/10 inline-block px-3 py-1 rounded-full border border-indigo-500/20">
                                                    {exp.date}
                                                </div>
                                                <div className="text-sm text-gray-500 mt-2 flex items-center md:justify-end">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {exp.location}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-400 mb-6 leading-relaxed">
                                            {exp.description}
                                        </p>

                                        {/* 4. BLINKING SKILL TAGS */}
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill, sIndex) => (
                                                <motion.span
                                                    key={sIndex}
                                                    whileHover={{ scale: 1.05 }}
                                                    className="px-3 py-1 text-xs font-medium text-gray-300 bg-gray-800 rounded-full border border-gray-700 
                                                               transition-all duration-300 cursor-default
                                                               hover:bg-indigo-500 hover:text-white hover:border-indigo-400 
                                                               hover:shadow-[0_0_10px_rgba(99,102,241,0.5)]
                                                               hover:animate-pulse"
                                                >
                                                    {skill}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;