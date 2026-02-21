'use client';

import { MessageCircle } from 'lucide-react';
import { CONTACT_NUMBER } from '@/lib/constants';

export default function WhatsAppButton() {
    const handleClick = () => {
        const message = encodeURIComponent("Olá! Gostaria de saber mais sobre a Frigideira Elétrica Saintciaga.");
        window.open(`https://wa.me/258${CONTACT_NUMBER}?text=${message}`, '_blank');
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-bold"
            aria-label="WhatsApp Contact"
        >
            <MessageCircle size={32} />
            <span className="hidden md:inline">Falar no WhatsApp</span>
        </button>
    );
}
