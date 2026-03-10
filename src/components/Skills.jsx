import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import skillsData from '../data/skills.json';

const Skills = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for right, -1 for left

    // Autoplay logic
    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prevIndex) => (prevIndex + 1) % skillsData.length);
        }, 10000); // Change slide every 4 seconds

        return () => clearInterval(timer);
    }, [currentIndex]); // resetting interval on index change

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % skillsData.length);
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + skillsData.length) % skillsData.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.9
        })
    };

    return (
        <section id="skills" className="py-20 bg-gray-950 border-t border-gray-800 relative overflow-hidden">
            {/* Background glowing elements */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
                        Technical Skills
                    </h2>
                </motion.div>

                {/* Slider Container */}
                <div className="relative h-[280px] md:h-[280px] w-full flex items-center justify-center">

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 md:left-4 z-20 p-4 bg-gray-900/60 border border-gray-700 hover:border-cyan-500/50 rounded-full text-white hover:text-cyan-400 transition-all shadow-lg backdrop-blur-md group"
                    >
                        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:right-4 z-20 p-4 bg-gray-900/60 border border-gray-700 hover:border-cyan-500/50 rounded-full text-white hover:text-cyan-400 transition-all shadow-lg backdrop-blur-md group"
                    >
                        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Slides */}
                    <div className="w-full max-w-4xl overflow-hidden px-14 md:px-24 h-full relative flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction} mode="popLayout">
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                className="w-full flex flex-col items-center"
                            >
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 border-b-2 border-indigo-500/50 pb-3 px-8 text-center tracking-wide">
                                    {skillsData[currentIndex].category}
                                </h3>

                                <div className="flex flex-wrap justify-center gap-4 md:gap-5">
                                    {skillsData[currentIndex].skills.map((skill, idx) => (
                                        <Tilt
                                            key={idx}
                                            tiltMaxAngleX={15}
                                            tiltMaxAngleY={15}
                                            scale={1.1}
                                            transitionSpeed={2000}
                                        >
                                            <div className="relative group/skill overflow-hidden bg-gray-800/80 backdrop-blur-md border border-gray-700/80 hover:border-cyan-400/50 px-6 py-3 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all cursor-default block">

                                                {/* Gradient Hover Background */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-cyan-600/90 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"></div>

                                                {/* Inner Subtle Glow on Hover */}
                                                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 blur-md opacity-0 group-hover/skill:opacity-20 transition-opacity duration-300"></div>

                                                <span className="relative z-10 font-medium text-lg text-gray-200 group-hover/skill:text-white transition-colors">
                                                    {skill}
                                                </span>
                                            </div>
                                        </Tilt>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Tracking Dots */}
                <div className="flex justify-center mt-6 space-x-3">
                    {skillsData.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === idx
                                ? 'bg-cyan-400 w-10 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                                : 'bg-gray-700 w-3 hover:bg-gray-500'
                                }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Skills;
