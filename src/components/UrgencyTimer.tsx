'use client';

import { useState, useEffect } from 'react';

interface UrgencyTimerProps {
    durationMinutes?: number;
}

export default function UrgencyTimer({ durationMinutes = 15 }: UrgencyTimerProps) {
    const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (!mounted) {
        return (
            <div className="bg-red-50 border-2 border-dashed border-red-500 rounded-lg p-3 text-center mb-6 h-24 flex items-center justify-center">
                <span className="text-red-300 font-bold uppercase tracking-widest text-xs animate-pulse">Carregando Oferta...</span>
            </div>
        );
    }

    return (
        <div className="bg-red-50 border-2 border-dashed border-red-500 rounded-lg p-3 text-center mb-6">
            <p className="text-red-700 font-bold mb-1">⏳ Oferta Especial Termina em</p>
            <span className="text-3xl font-mono font-bold text-red-600 tracking-wider">
                {formatTime(timeLeft)}
            </span>
        </div>
    );
}
