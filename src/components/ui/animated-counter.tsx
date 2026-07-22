'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
    value: string; // e.g. "7+" or "50+" or "100%"
    label: string;
}

export function AnimatedCounter({ value, label }: AnimatedCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const [displayVal, setDisplayVal] = useState(0);

    const numericMatch = value.match(/\d+/);
    const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
    const suffix = value.replace(/\d+/g, '');

    useEffect(() => {
        if (!isInView || targetNumber === 0) return;

        let start = 0;
        const duration = 1500; // 1.5s
        const steps = 40;
        const stepTime = duration / steps;
        const increment = targetNumber / steps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= targetNumber) {
                setDisplayVal(targetNumber);
                clearInterval(timer);
            } else {
                setDisplayVal(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, targetNumber]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md">
            <div className="text-3xl md:text-4xl font-extrabold text-white font-mono tracking-tight">
                {targetNumber > 0 ? displayVal : value}{suffix}
            </div>
            <span className="text-xs font-medium text-zinc-400 mt-1 uppercase tracking-wider text-center">{label}</span>
        </div>
    );
}
