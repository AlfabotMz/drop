'use client';

import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { PRODUCT_DATA } from '@/lib/constants';

export default function ExitIntentDownsell() {
    const [show, setShow] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY < 0 && !dismissed) {
                setShow(true);
            }
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [dismissed]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full relative shadow-[0_0_100px_rgba(220,38,38,0.3)] border-4 border-red-600 animate-in zoom-in duration-300">
                <button
                    onClick={() => { setShow(false); setDismissed(true); }}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="text-center">
                    <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Gift className="text-red-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-red-600 mb-2 uppercase tracking-tighter">Oferta de Última Hora!</h2>
                    <p className="text-gray-600 font-bold mb-6">Não queremos que você perca esta oportunidade.</p>

                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border-2 border-dashed border-gray-200">
                        <span className="block text-gray-400 line-through font-bold text-lg mb-1">3699 Mt</span>
                        <span className="text-5xl font-black text-gray-900 tracking-tight">3299 Mt</span>
                        <span className="block text-red-600 text-xs font-black uppercase mt-2 tracking-widest">Últimas unidades com este preço</span>
                    </div>

                    <a
                        href="#checkout"
                        onClick={() => { setShow(false); setDismissed(true); }}
                        className="block w-full bg-green-600 text-white p-6 rounded-2xl font-black text-xl uppercase tracking-tighter shadow-xl hover:bg-green-700 transition-all active:scale-95"
                    >
                        APROVEITAR O DESCONTO AGORA
                    </a>
                </div>
            </div>
        </div>
    );
}
