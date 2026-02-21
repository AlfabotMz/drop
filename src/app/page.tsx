'use client';

import { PRODUCT_DATA } from '@/lib/constants';
import WhatsAppButton from '@/components/WhatsAppButton';
import UrgencyTimer from '@/components/UrgencyTimer';
import CheckoutForm from '@/components/CheckoutForm';
import ExitIntentDownsell from '@/components/ExitIntentDownsell';
import { ShoppingCart, Star, CheckCircle2, Package, Zap, ShieldCheck, Truck } from 'lucide-react';

export default function LandingPage() {
  const { product, features, specs, top_alerts } = PRODUCT_DATA;
  const bestOffer = product.price.offers[1];

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 selection:bg-green-100">
      {/* Repeating Banner */}
      <div className="bg-red-700 text-white py-2 overflow-hidden whitespace-nowrap sticky top-0 z-40 shadow-md">
        <div className="inline-block animate-marquee uppercase font-black text-sm tracking-widest">
          {Array(10).fill(`${top_alerts.content.headline} - ${top_alerts.content.subheadline}`).join(' • ')}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <header className="text-center mb-4">
          <div className="flex flex-col items-center gap-1 mb-2">
            <h1 className="text-2xl md:text-4xl font-black tracking-tighter leading-none uppercase">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                <Star className="fill-yellow-500 border-none" size={10} />
                <span>{product.rating.value}</span>
              </div>
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest">
                {product.tagline}
              </p>
            </div>
          </div>

          {/* Main Image Display - More compact */}
          <div className="relative w-full max-w-[280px] mx-auto overflow-hidden rounded-xl mb-3 shadow-lg border border-white">
            <img
              src="/images/pe6.png"
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute top-2 left-2 glass px-2 py-0.5 rounded-full flex items-center gap-1">
              <Truck size={12} className="text-green-600" />
              <span className="text-[9px] font-black uppercase tracking-widest">Pague na Entrega</span>
            </div>
          </div>

          <div className="bg-red-50 border border-dashed border-red-500 rounded-xl p-2 mb-4 shadow-sm max-w-sm mx-auto">
            <div className="flex justify-center items-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-0.5">1 UNID.</span>
                <span className="text-gray-400 line-through font-bold text-[10px]">4000 Mt</span>
                <span className="text-lg font-black text-red-600 leading-none">3699 Mt</span>
              </div>
              <div className="h-6 w-px bg-red-200" />
              <div className="flex flex-col items-center">
                <span className="text-[8px] font-black text-green-600 uppercase tracking-widest mb-0.5">2 UNID. (COMBO)</span>
                <span className="text-gray-400 line-through font-bold text-[10px]">8000 Mt</span>
                <span className="text-lg font-black text-green-600 leading-none">6500 Mt</span>
              </div>
            </div>
          </div>

          <a
            href="#checkout"
            className="w-full max-w-sm inline-flex flex-col items-center gap-0.5 bg-green-600 text-white px-8 py-3 rounded-xl shadow-xl hover:bg-green-700 transition-all transform active:scale-95 group"
          >
            <span className="text-lg font-black uppercase tracking-tighter">ENCOMENDE AGORA</span>
            <span className="text-[9px] font-bold opacity-80 uppercase tracking-widest leading-none">
              PAGA AO RECEBER • ENTREGA GRÁTIS
            </span>
          </a>
        </header>

        {/* Value Prop */}
        <section className="bg-green-50 rounded-[2.5rem] p-8 md:p-12 mb-16 border-2 border-green-100">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight uppercase leading-none text-center">
            Cozinhe Tudo em Um Só Lugar
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 font-medium leading-relaxed text-center">
            Cansado de sujar várias panelas para uma única refeição? A Panela Elétrica frita, cozinha, grelha e prepara sopas com rapidez e praticidade.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, label: "AQUECIMENTO RÁPIDO" },
              { icon: Package, label: "4L CAPACIDADE" },
              { icon: ShieldCheck, label: "ANTIADERENTE PREMIUM" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm border border-green-200">
                <item.icon className="text-green-600 mb-2" size={32} />
                <span className="font-black text-xs uppercase tracking-widest text-center">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Product Images (Secondary) */}
        <section className="mb-16">
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/pe1.webp" className="rounded-2xl border-2 border-white shadow-lg aspect-square object-cover" />
            <img src="/images/pe2.webp" className="rounded-2xl border-2 border-white shadow-lg aspect-square object-cover" />
            <img src="/images/pe5.png" className="rounded-2xl border-2 border-white shadow-lg aspect-square object-cover" />
            <img src="/images/pe4.avif" className="rounded-2xl border-2 border-white shadow-lg aspect-square object-cover" />
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h3 className="text-2xl font-black mb-8 uppercase tracking-widest border-b-4 border-yellow-400 inline-block">
            Por que Você Precisa Desta Panela?
          </h3>
          <ul className="space-y-4">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                <CheckCircle2 className="text-green-600 mt-1 shrink-0" size={24} />
                <span className="text-lg font-bold text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Promotion Pricing Banner */}
        <section className="bg-yellow-50 rounded-[2.5rem] p-8 md:p-12 mb-16 border-4 border-yellow-200 shadow-xl relative overflow-hidden text-center">
          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest rotate-3 animate-pulse">
            Melhor Oferta
          </div>
          <h3 className="text-2xl font-black mb-8 uppercase tracking-tight">OFERTA EXCLUSIVA DE LANÇAMENTO</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-3xl shadow-md border-2 border-red-100">
              <p className="font-black text-gray-400 uppercase text-[10px] tracking-widest mb-2">Uma Unidade</p>
              <p className="text-gray-400 line-through text-lg font-bold">4000 MZN</p>
              <p className="text-4xl font-black text-red-600 tracking-tighter">3699 Mt</p>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-md border-4 border-green-500 scale-105">
              <p className="font-black text-green-600 uppercase text-[10px] tracking-widest mb-2">Combo (Duas Unidades)</p>
              <p className="text-gray-400 line-through text-lg font-bold">8000 MZN</p>
              <p className="text-4xl font-black text-green-600 tracking-tighter">6500 Mt</p>
              <span className="inline-block mt-2 bg-green-100 text-green-800 text-[10px] font-black px-2 py-1 rounded-full uppercase">Economize 1500 Mt</span>
            </div>
          </div>

          <a
            href="#checkout"
            className="w-full bg-red-600 text-white p-6 rounded-2xl flex items-center justify-center gap-3 font-black text-xl uppercase tracking-tighter hover:scale-[1.02] transition-transform shadow-2xl"
          >
            EU QUERO APROVEITAR - PAGAR NA ENTREGA
          </a>
        </section>

        {/* Technical Specs */}
        <section className="mb-16 bg-gray-900 text-white rounded-[2.5rem] p-8 md:p-12">
          <h3 className="text-2xl font-black mb-8 uppercase tracking-widest text-yellow-400">Especificações Técnicas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
            {Object.entries(specs).map(([key, value]) => (
              <div key={key} className="border-b border-gray-800 pb-2">
                <span className="block text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-1">{key}</span>
                <span className="text-lg font-bold">{value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Checkout Form */}
        <CheckoutForm />

        {/* Trust Badges */}
        <footer className="mt-12 text-center p-8 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {["Pagamento na Entrega", "Entrega Segura", "Produto Original"].map((badge, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-400 font-black text-xs uppercase tracking-widest">
                <ShieldCheck size={16} />
                <span>{badge}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]" suppressHydrationWarning>
            © {new Date().getFullYear()} CHAVA24 Moçambique. Todos os direitos reservados.
          </p>
        </footer>
      </div>

      <WhatsAppButton />
      <ExitIntentDownsell />
    </main>
  );
}
