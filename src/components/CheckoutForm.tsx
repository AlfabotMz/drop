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
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center border-4 border-green-500 max-w-lg mx-auto">
                <div className="text-6xl mb-6">🎉</div>
                <h2 className="text-3xl font-black text-green-600 mb-2 uppercase tracking-tighter">Encomenda Confirmada!</h2>
                <p className="text-gray-600 mb-6 font-bold uppercase text-sm tracking-widest">A equipa da <span className="text-black font-black">CHAVA24</span> entrará em contacto em breve.</p>

                <div className="bg-green-50 p-6 rounded-2xl mb-8 border-2 border-green-100">
                    <p className="font-black text-green-800 text-lg uppercase tracking-tight">PAGARÁ NO MOMENTO DA ENTREGA</p>
                </div>

                <a
                    href={`https://wa.me/258872204494`}
                    target="_blank"
                    className="w-full bg-[#25D366] text-white p-5 rounded-2xl flex items-center justify-center gap-3 font-black text-sm uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl mb-4"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.03c0 2.12.553 4.189 1.601 6.04L0 24l6.105-1.602a11.832 11.832 0 005.937 1.597h.005c6.632 0 12.028-5.391 12.031-12.029a11.79 11.79 0 00-3.417-8.514z" /></svg>
                    Tirar Dúvidas no WhatsApp
                </a>

                <p className="font-bold text-gray-400 text-[10px] uppercase tracking-[0.3em] mt-8">Agradecemos a preferência! • CHAVA24</p>
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
