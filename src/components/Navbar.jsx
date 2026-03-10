import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Skills', href: '/#skills' },
        { name: 'Experience', href: '/#experience' },
        { name: 'Education', href: '/#education' },
        { name: 'Projects', href: '/#projects' },
        { name: 'Resume', href: '/resume' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-[100] transition-all duration-500 flex justify-center px-4 ${scrolled ? 'top-4' : 'top-6'}`}
        >
            <div
                className={`w-full max-w-4xl transition-all duration-500 
                ${scrolled
                        ? 'rounded-2xl md:rounded-full bg-[#050505]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-2'
                        : 'rounded-2xl md:rounded-full bg-[#0a0f25]/50 backdrop-blur-md border border-indigo-500/20 shadow-xl py-3'
                    } px-6 md:px-8 flex flex-wrap items-center justify-between`}
            >

                {/* Brand / Logo */}
                <a href="/#hero" className="flex items-center group relative overflow-hidden">
                    <span className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-cyan-400 transition-all duration-300">
                        Ashish
                    </span>
                </a>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden text-gray-400 hover:text-white focus:outline-none transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-1 font-medium text-sm">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="relative px-4 py-2 text-gray-300 hover:text-white transition-colors duration-300 rounded-full group"
                        >
                            <span className="relative z-10">{link.name}</span>
                            <div className="absolute inset-0 h-full w-full rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    ))}
                </div>

                {/* Desktop Action Button */}
                <div className="hidden md:block">
                    <a
                        href="#contact"
                        className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-500/20 hover:bg-indigo-500/40 border border-indigo-500/30 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                    >
                        Let's Talk
                    </a>
                </div>

                {/* Mobile Navigation Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="w-full md:hidden flex flex-col mt-4 space-y-1 pb-2 border-t border-white/10 pt-4"
                        >
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all font-medium"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-3 text-indigo-400 font-bold hover:bg-white/10 rounded-xl transition-all mt-2"
                            >
                                Let's Talk
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </motion.nav>
    );
};

export default Navbar;
