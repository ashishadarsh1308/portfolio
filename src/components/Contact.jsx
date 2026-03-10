import React from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

const Contact = () => {

    const contactMethods = [
        {
            title: "LinkedIn",
            value: "ashishadarsh1301",
            link: "https://www.linkedin.com/in/ashishadarsh1301/",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
            ),
            color: "group-hover:text-blue-400 border-blue-500/30",
            bgHover: "hover:border-blue-500/50 hover:shadow-blue-500/20"
        },
        {
            title: "Email",
            value: "ashishadarsh319@gmail.com",
            link: "mailto:ashishadarsh319@gmail.com",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: "group-hover:text-red-400 border-red-500/30",
            bgHover: "hover:border-red-500/50 hover:shadow-red-500/20"
        },
        {
            title: "Phone",
            value: "+91 8102524428",
            link: "tel:+918102524428",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            color: "group-hover:text-emerald-400 border-emerald-500/30",
            bgHover: "hover:border-emerald-500/50 hover:shadow-emerald-500/20"
        },
        {
            title: "Twitter / X",
            value: "@AshishKumarAda1",
            link: "https://x.com/AshishKumarAda1",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            color: "group-hover:text-gray-200 border-gray-400/30",
            bgHover: "hover:border-gray-400/50 hover:shadow-gray-400/20"
        },
        {
            title: "GitHub",
            value: "ashishadarsh1308",
            link: "https://github.com/ashishadarsh1308",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
            color: "group-hover:text-white border-gray-500/30",
            bgHover: "hover:border-gray-500/50 hover:shadow-gray-500/20"
        },
        {
            title: "LeetCode",
            value: "ashish_adarsh_007",
            link: "https://leetcode.com/u/ashish_adarsh_007/",
            icon: (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.483 0a1.374 1.374 0 00-.961.41L7.116 5.89a1.374 1.374 0 000 1.943L11.932 12.7a1.374 1.374 0 001.943 0l5.404-5.404a1.374 1.374 0 000-1.943L14.444.41a1.374 1.374 0 00-.961-.41zM12 14.286a4.286 4.286 0 110-8.572 4.286 4.286 0 010 8.572z" />
                    <path d="M16.118 18.667l3.882 3.914a1.333 1.333 0 010 1.887 1.333 1.333 0 01-1.887 0l-3.882-3.914a1.333 1.333 0 010-1.887 1.333 1.333 0 011.887 0zM4.032 18.667l-3.882 3.914a1.333 1.333 0 000 1.887 1.333 1.333 0 001.887 0l3.882-3.914a1.333 1.333 0 000-1.887 1.333 1.333 0 00-1.887 0zM12 24c-2.31 0-4.444-.888-6.059-2.348l1.458-1.472C8.71 21.314 10.283 21.857 12 21.857c4.665 0 8.571-3.906 8.571-8.571 0-1.717-.543-3.29-1.677-4.583l1.472-1.458C21.826 8.841 22.714 10.975 22.714 13.286 22.714 19.167 17.881 24 12 24z" />
                </svg>
            ),
            color: "group-hover:text-yellow-500 border-yellow-600/30",
            bgHover: "hover:border-yellow-600/50 hover:shadow-yellow-600/20"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="contact" className="relative py-20 bg-[#070b1c] border-t border-gray-800 overflow-hidden">

            {/* Sparkle Particles Overlay Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none
            [background-image:radial-gradient(white_1px,transparent_1px)]
            [background-size:20px_20px]"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
                <motion.div
                    initial={{ opacity: 0, y: -40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                        Let's Connect
                    </h2>
                    <p className="text-xl text-gray-400">
                        Feel free to reach out to me below. Always open to new opportunities!
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                    {contactMethods.map((method, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <a href={method.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer group">
                                <Tilt
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    scale={1.03}
                                    transitionSpeed={2500}
                                    className="h-full"
                                >
                                    <div className={`h-full bg-gray-900/60 backdrop-blur-md rounded-2xl p-8 border border-gray-800 transition-all duration-300 shadow-xl ${method.bgHover} flex items-center`}>

                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center border transition-colors duration-300 text-gray-400 ${method.color} bg-gray-800 mr-6 shadow-inner shrink-0`}>
                                            {method.icon}
                                        </div>

                                        <div className="truncate">
                                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                                {method.title}
                                            </h3>
                                            <p className="text-gray-400 text-lg font-mono truncate">
                                                {method.value}
                                            </p>
                                        </div>

                                    </div>
                                </Tilt>
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
