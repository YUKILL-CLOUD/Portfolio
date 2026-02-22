"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export function SwipeButton({ text = "See my works" }: { text?: string }) {
    const [isTriggered, setIsTriggered] = useState(false);

    const handleClick = () => {
        if (isTriggered) return;
        setIsTriggered(true);

        setTimeout(() => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", "#projects");

            setTimeout(() => {
                setIsTriggered(false);
            }, 600);
        }, 400);
    };

    return (
        <button
            onClick={handleClick}
            className="group relative flex items-center h-14 md:h-16 w-60 md:w-64 overflow-hidden rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] transition-all duration-300 border-none outline-none focus:outline-none"
        >
            {/* The Arrow Knob */}
            <motion.div
                initial={false}
                animate={{
                    x: isTriggered ? "12rem" : 0,
                    scale: isTriggered ? 1.5 : 1
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="absolute left-1.5 md:left-2 flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-white text-zinc-950 transition-transform duration-300 group-hover:scale-110"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </motion.div>

            {/* The Text */}
            <motion.div
                initial={false}
                animate={{
                    x: isTriggered ? "-4rem" : 0
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="ml-auto w-[calc(100%-3rem)] md:w-[calc(100%-3.5rem)] text-center font-bold text-base md:text-lg whitespace-nowrap transition-transform duration-300 group-hover:-translate-x-1"
            >
                {text}
            </motion.div>
        </button>
    )
}
