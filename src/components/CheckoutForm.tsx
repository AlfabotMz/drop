'use client';

import { useState } from 'react';
import { PRODUCT_DATA } from '@/lib/constants';

export default function CheckoutForm() {
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        province: '',
        delivery_location: '',
        delivery_priority: 'Hoje',
        agreed: false
    });
    const [selectedOfferIndex, setSelectedOfferIndex] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const activeOffer = PRODUCT_DATA.product.price.offers[selectedOfferIndex];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert("Por favor, confirme que estará disponível para receber.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    total_price: activeOffer.current_price,
                    product_id: PRODUCT_DATA.product.id,
                    quantity: selectedOfferIndex === 0 ? 1 : 2
                })
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert("Erro ao enviar pedido. Tente novamente.");
            }
        } catch (error) {
            console.error(error);
            alert("Erro de conexão.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-2 border-green-500">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Parabéns pela sua encomenda!</h2>
                <p className="text-gray-600 mb-4">Entraremos em contacto para confirmar a entrega.</p>
                <div className="bg-green-50 p-4 rounded-xl mb-4">
                    <p className="font-bold text-green-800">IRA PAGAR NO MOMENTO DA ENTREGA</p>
                </div>
                <p className="font-bold text-gray-800 text-sm mt-4">Agradecemos a preferência!</p>
            </div>
        );
    }

    return (
        <section id="checkout" className="bg-gray-50 p-6 rounded-2xl shadow-inner border border-gray-200">
            <h2 className="text-2xl font-black text-center text-red-600 mb-6 tracking-tight uppercase">
                PREENCHA PARA FINALIZAR A COMPRA
            </h2>

            {/* Selection Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {PRODUCT_DATA.product.price.offers.map((offer, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedOfferIndex(idx)}
                        className={`relative cursor-pointer p-4 rounded-2xl border-4 transition-all flex items-center gap-4 ${selectedOfferIndex === idx
                                ? 'border-green-600 bg-green-50 shadow-lg scale-[1.02]'
                                : 'border-white bg-white hover:border-gray-200'
                            }`}
                    >
                        {selectedOfferIndex === idx && (
                            <div className="absolute -top-3 -right-3 bg-green-600 text-white p-1 rounded-full">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        )}
                        <img
                            src={`/images/${offer.icon}`}
                            alt={offer.label}
                            className="w-20 h-20 object-cover rounded-xl shadow-sm"
                        />
                        <div>
                            <p className="font-black text-gray-900 uppercase text-xs tracking-widest mb-1">{offer.label}</p>
                            <div className="flex flex-col">
                                <span className="text-gray-400 line-through text-sm font-bold">{offer.old_price} Mt</span>
                                <span className="text-2xl font-black text-red-600 tracking-tight">{offer.current_price} Mt</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 mb-8 text-center animate-pulse">
                <p className="font-black text-yellow-800 uppercase tracking-tighter">
                    🚀 IRA PAGAR NO MOMENTO DA ENTREGA
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Nome Completo *</label>
                    <input
                        required
                        type="text"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                        placeholder="DIGITE SEU NOME COMPLETO"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Contacto *</label>
                    <input
                        required
                        type="tel"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                        placeholder="NÚMERO PARA CHAMADAS"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Província *</label>
                    <input
                        required
                        type="text"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                        placeholder="DIGITE SUA PROVINCIA"
                        value={formData.province}
                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 uppercase tracking-wider">Local de Entrega + Horário *</label>
                    <input
                        required
                        type="text"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                        placeholder="Ex: BAIRRO DO JARDIM 09h"
                        value={formData.delivery_location}
                        onChange={(e) => setFormData({ ...formData, delivery_location: e.target.value })}
                    />
                </div>

                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-center">
                    <p className="text-red-700 font-bold text-xs uppercase mb-3">
                        SELECIONE QUANDO DESEJA RECEBER A SUA ENCOMENDA
                    </p>
                    <div className="flex gap-4 justify-center">
                        {['Hoje', 'Amanhã'].map((option) => (
                            <label key={option} className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="radio"
                                    name="priority"
                                    checked={formData.delivery_priority === option}
                                    onChange={() => setFormData({ ...formData, delivery_priority: option })}
                                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                                />
                                <span className="font-bold text-gray-700 group-hover:text-green-600">✓ {option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                        required
                        type="checkbox"
                        checked={formData.agreed}
                        onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                        className="mt-1 w-5 h-5 rounded text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm font-bold text-gray-700 leading-tight uppercase">
                        CONFIRMO que estou disponível para RECEBER na DATA que COLOQUEI
                    </span>
                </label>

                <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white p-6 rounded-2xl shadow-xl transition-all transform active:scale-95 flex flex-col items-center justify-center gap-1 group"
                >
                    <span className="text-xl font-black uppercase tracking-tighter group-hover:scale-105 transition-transform">
                        {isSubmitting ? 'PROCESSANDO...' : `CONCLUIR PEDIDO - ${activeOffer.current_price} Mt`}
                    </span>
                </button>
            </form>
        </section>
    );
}
