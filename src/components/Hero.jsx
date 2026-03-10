import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const Hero = () => {
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };

    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    /* ROTATING FEATURES */
    const features = [
        "Full Stack Developer",
        "Machine Learning Engineer",
        "Cybersecurity",
        "M.Tech CSE (Information Security) @ NITK",
    ];

    const [featureIndex, setFeatureIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setFeatureIndex((prev) => (prev + 1) % features.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="hero"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-gray-950 lg:cursor-none"
        >
            {/* CUSTOM CURSOR */}
            <AnimatePresence>
                {isHovering && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="fixed top-0 left-0 w-8 h-8 bg-indigo-500 rounded-full mix-blend-screen pointer-events-none z-50 hidden lg:block shadow-[0_0_20px_rgba(99,102,241,0.8)]"
                            style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none z-40 hidden lg:block"
                            style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
                        />
                    </>
                )}
            </AnimatePresence>

            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <motion.span
                            key={i}
                            className="absolute w-1 h-1 bg-indigo-400/40 rounded-full"
                            animate={{ y: [0, -120], opacity: [0, 1, 0] }}
                            transition={{
                                duration: 6 + i,
                                repeat: Infinity,
                                delay: i * 0.4
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                bottom: "-20px"
                            }}
                        />
                    ))}
                </div>

                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* LEFT CONTENT */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                        }}
                        className="text-center lg:text-left"
                    >
                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            className="text-5xl md:text-8xl font-black tracking-[-0.03em] mb-8 leading-[1.1]"
                        >
                            <span className="text-white">I'm </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-[length:200%_200%] animate-gradient">
                                Ashish Kumar Adarsh
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-400 mb-6 leading-relaxed font-light"
                        >
                            M.Tech in <span className="text-white font-medium">Computer Science </span> (Information Security) at <span className="text-white font-medium"> NITK</span>,
                            skilled in <span className="text-white font-medium">Full Stack Development, Machine Learning, and Network Security</span>,
                            seeking opportunities in <span className="text-white font-medium">Software Engineering</span>.
                        </motion.p>

                        {/* ROTATING FEATURES */}
                        <div className="h-8 flex items-center justify-center lg:justify-start mb-10">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={featureIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-indigo-400 text-lg font-medium"
                                >
                                    {features[featureIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href="#projects"
                                className="group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all shadow-2xl shadow-indigo-500/20"
                            >
                                <div className="absolute inset-0 bg-indigo-600 transition-all group-hover:bg-indigo-500" />
                                <span className="relative z-10">Explore My Projects</span>
                            </motion.a>

                            <motion.a
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
                                whileTap={{ scale: 0.95 }}
                                href="#contact"
                                className="px-8 py-4 rounded-2xl font-bold text-gray-300 bg-transparent border border-gray-800 backdrop-blur-sm transition-all shadow-xl"
                            >
                                Let's Talk
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* RIGHT IMAGE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative flex justify-center lg:justify-end"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full border border-dashed border-indigo-500/20 rounded-full"
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur opacity-40 group-hover:opacity-70 transition duration-1000"></div>
                            <motion.div
                                animate={{ x: [-30, 30, -30], y: [-15, 15, -15] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="relative z-10 inline-flex items-center px-4 py-2 rounded-full border border-indigo-500/30 bg-gray-900/80 backdrop-blur-md text-indigo-300 text-sm font-medium mb-8 shadow-lg shadow-indigo-500/10"
                            >
                                <span className="flex w-2 h-2 rounded-full bg-indigo-500 mr-3 animate-ping" />
                                Open for 2026 Opportunities
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
                            >
                                <img
                                    src="https://res.cloudinary.com/ds3t0xxe9/image/upload/v1773141002/WhatsApp_Image_2026-03-10_at_16.29.20_tdwpdl.jpg"
                                    alt="Ashish"
                                    className="w-full h-full object-cover rounded-[2rem] border-2 border-white/10 shadow-2xl grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                                />

                                <motion.div
                                    animate={{ x: [0, 10, 0], y: [0, 15, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -bottom-6 -right-6 bg-gray-900/80 backdrop-blur-xl border border-gray-800 p-4 rounded-2xl shadow-2xl"
                                >
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Status</p>
                                    <p className="text-white font-medium flex items-center">🚀 Let's Build</p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );

};

export default Hero;