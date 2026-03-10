import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";
import educationData from "../data/education.json";

const Education = () => {

    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (

        <section
            id="education"
            className="relative py-20 bg-gray-900 border-t border-gray-800 overflow-hidden"
        >

            {/* Background elements removed */}

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Education
                    </h2>
                    <p className="mt-4 text-xl text-gray-400">
                        My academic background and qualifications.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative">

                    {/* Background Timeline */}
                    <div className="hidden md:block absolute left-1/2 top-0 w-px h-full bg-gray-800 -translate-x-1/2"></div>

                    {/* Animated Timeline Fill */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="hidden md:block absolute left-1/2 top-0 w-px bg-cyan-500 -translate-x-1/2 shadow-[0_0_12px_rgba(6,182,212,0.7)]"
                    />

                    <div className="space-y-12 md:space-y-0">
                        {educationData.map((edu, index) => {

                            const isLeft = index % 2 === 0;

                            return (

                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className={`relative flex flex-col md:flex-row group
                                    ${isLeft ? "md:justify-start" : "md:justify-end md:-mt-24"}
                                    pl-8 md:pl-0 mt-8 md:mt-0`}
                                >

                                    {/* Timeline Dot */}
                                    <motion.div
                                        initial={{ scale: 0.6, opacity: 0.5 }}
                                        whileInView={{ scale: 1.2, opacity: 1 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute top-4 left-[-8px] md:left-1/2 md:-translate-x-1/2
                                        w-4 h-4 bg-cyan-400 rounded-full
                                        shadow-[0_0_16px_rgba(34,211,238,0.9)]
                                        z-10"
                                    />

                                    {/* Card */}
                                    <div className="md:w-[45%] w-full">

                                        <Tilt
                                            tiltMaxAngleX={12}
                                            tiltMaxAngleY={12}
                                            scale={1.03}
                                            transitionSpeed={2500}
                                        >

                                            <div className="bg-gray-900/60 backdrop-blur-lg border border-gray-800 p-6 rounded-2xl
                                            transition-all duration-500
                                            hover:-translate-y-2
                                            hover:border-cyan-400/40
                                            shadow-lg hover:shadow-cyan-500/30">

                                                {/* Header */}
                                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                                                    <div className="flex items-center mb-4 md:mb-0">
                                                        {edu.logo ? (
                                                            <img
                                                                src={edu.logo}
                                                                alt={edu.institution}
                                                                className="w-14 h-14 rounded-full mr-5 border-2 border-cyan-500/30 object-contain bg-white shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-14 h-14 rounded-full mr-5 border-2 border-gray-700 bg-gray-800 flex items-center justify-center text-gray-400 font-bold text-xl shrink-0">
                                                                {edu.institution.charAt(0)}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                                                                {edu.institution}
                                                            </h3>
                                                            <div className="text-lg font-medium text-gray-300 mt-1">
                                                                {edu.degree}
                                                                {edu.field && (
                                                                    <span className="text-gray-400 font-normal">
                                                                        {" in "}{edu.field}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {(edu.specialization || edu.board) && (
                                                                <div className="text-sm font-medium text-cyan-400 mt-1">
                                                                    {edu.specialization && <span>Specialization: {edu.specialization}</span>}
                                                                    {edu.board && <span>Board: {edu.board}</span>}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="mt-2 md:mt-0 text-left md:text-right shrink-0 ml-4">
                                                        <div className="text-sm font-semibold text-cyan-400 bg-cyan-500/10 inline-block px-3 py-1 rounded-full border border-cyan-500/20">
                                                            {edu.duration || edu.date}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-sm text-gray-500 mb-4 flex items-center md:justify-start">
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    {edu.location}
                                                </div>

                                                {/* Highlights */}
                                                {edu.highlights && edu.highlights.length > 0 && (
                                                    <ul className="mt-4 space-y-2">
                                                        {edu.highlights.map((highlight, hIndex) => (
                                                            <li key={hIndex} className="text-sm text-gray-400 flex items-start">
                                                                <span className="text-cyan-500 mr-2 mt-0.5 opacity-80">▹</span>
                                                                <span className="leading-relaxed">{highlight}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                {/* GPA / Percentage */}
                                                <div className="mt-6 flex flex-wrap gap-3">
                                                    {edu.gpa && (
                                                        <span className="text-gray-400 font-mono bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800 shadow-inner flex items-center">
                                                            <strong className="text-cyan-400/80 font-sans mr-2 text-sm uppercase tracking-wider">GPA</strong>
                                                            <span className="text-gray-200">{edu.gpa}</span>
                                                        </span>
                                                    )}

                                                    {(edu.percentage || edu.Percentage) && (
                                                        <span className="text-gray-400 font-mono bg-gray-900/50 px-3 py-1.5 rounded-lg border border-gray-800 shadow-inner flex items-center">
                                                            <strong className="text-cyan-400/80 font-sans mr-2 text-sm uppercase tracking-wider">Score</strong>
                                                            <span className="text-gray-200">{edu.percentage || edu.Percentage}</span>
                                                        </span>
                                                    )}
                                                </div>

                                            </div>

                                        </Tilt>

                                    </div>

                                </motion.div>

                            );

                        })}

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Education;