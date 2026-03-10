import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import projectsData from '../data/projects.json';

const Projects = () => {
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth } = scrollRef.current;

            // Loop to the end if we are at the beginning
            if (scrollLeft <= 5) {
                scrollRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
            }
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

            // Loop back to the beginning if we've reached the end
            if (scrollLeft + clientWidth >= scrollWidth - 5) {
                scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
            }
        }
    };

    return (
        <section id="projects" className="py-24 bg-[#070b1c] relative overflow-hidden">

            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="text-left"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 tracking-tight">
                            Featured Projects
                        </h2>
                        <p className="mt-4 text-xl text-gray-400 max-w-2xl font-light">
                            A showcase of my recent work in full-stack development, machine learning, and cybersecurity.
                        </p>
                    </motion.div>
                </div>

                {/* Horizontal Scroll Wrapper */}
                <div className="relative group/slider">

                    {/* (Removed Fading Edges here) */}

                    {/* Left Navigation Arrow */}
                    <button
                        onClick={scrollLeft}
                        className="hidden md:block absolute left-2 xl:-left-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-gray-900/95 border border-gray-700 text-gray-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/20 transition-all duration-700 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md opacity-0 group-hover/slider:opacity-100 group/btn"
                    >
                        <svg className="w-8 h-8 transform group-hover/btn:-rotate-[360deg] transition-transform duration-1000" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Right Navigation Arrow */}
                    <button
                        onClick={scrollRight}
                        className="hidden md:block absolute right-2 xl:-right-6 top-1/2 -translate-y-1/2 z-30 p-4 rounded-full bg-gray-900/95 border border-gray-700 text-gray-300 hover:text-white hover:border-indigo-500 hover:bg-indigo-500/20 transition-all duration-700 shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md opacity-0 group-hover/slider:opacity-100 group/btn"
                    >
                        <svg className="w-8 h-8 transform group-hover/btn:rotate-[360deg] transition-transform duration-1000" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Horizontal Scroll Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-12 pt-4 px-4 md:px-8 xl:px-0 scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {projectsData.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1.2, delay: index * 0.2 }}
                                className="w-[85vw] sm:w-[350px] md:min-w-[400px] lg:w-[calc(33.333%-1.33rem)] shrink-0 snap-center h-full"
                            >
                                <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} scale={1.02} transitionSpeed={3000} className="h-full block">
                                    <div className="group h-full flex flex-col relative bg-gray-900/60 backdrop-blur-md border border-gray-800 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-all duration-700 shadow-xl hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]">

                                        {/* Image Section */}
                                        <div className="relative aspect-video overflow-hidden shrink-0">
                                            <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-all duration-700 z-10" />
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            />

                                            {/* Overlay Tags */}
                                            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                                                {project.tags.slice(0, 2).map((tag, tagIndex) => (
                                                    <span key={tagIndex} className="px-3 py-1 text-xs font-bold text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 2 && (
                                                    <span className="px-3 py-1 text-xs font-bold text-white bg-black/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg cursor-help" title={project.tags.slice(2).join(', ')}>
                                                        +{project.tags.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-8 flex flex-col flex-grow">
                                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors duration-500 line-clamp-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed font-light">
                                                {project.description}
                                            </p>

                                            <div className="mt-auto pt-4 border-t border-gray-800/50">
                                                {project.link.startsWith('/') ? (
                                                    <Link to={project.link} className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-semibold transition-colors group/link w-full justify-between">
                                                        <span>Explore Case Study</span>
                                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 group-hover/link:bg-indigo-500/20 transition-colors">
                                                            <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                            </svg>
                                                        </span>
                                                    </Link>
                                                ) : (
                                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group/link w-full justify-between">
                                                        <span>View GitHub Repo</span>
                                                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 group-hover/link:bg-cyan-500/20 transition-colors">
                                                            <svg className="w-5 h-5 group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
