'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Phone, MapPin, Calendar, Clock, MozIcon } from 'lucide-react';

interface Order {
    id: number;
    full_name: string;
    phone: string;
    province: string;
    delivery_location: string;
    delivery_priority: string;
    total_price: number;
    product_id: string;
    status: string;
    created_at: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            try {
                // Verificar autenticação
                const authRes = await fetch('/api/auth');
                const authData = await authRes.json();

                if (!authData.authenticated) {
                    router.push('/login');
                    return;
                }

                // Se autenticado, buscar pedidos
                const response = await fetch('/api/orders');
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        checkAuthAndFetch();
    }, [router]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-black uppercase tracking-[0.5em] text-gray-300">
            Carregando Pedidos...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8 border-b-8 border-black pb-4">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                        ENCOMENDAS <span className="text-red-600">RECEBIDAS</span>
                    </h1>
                    <div className="bg-black text-white px-6 py-2 rounded-full font-black text-xl">
                        {orders.length}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-black group hover:-translate-y-1 transition-transform">
                            <div className="flex flex-col md:flex-row">
                                <div className="bg-black text-white p-6 md:w-64 flex flex-col justify-between">
                                    <div>
                                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-1">DATA DO PEDIDO</span>
                                        <div className="flex items-center gap-2 font-bold mb-4">
                                            <Calendar size={18} />
                                            {new Date(order.created_at).toLocaleDateString('pt-PT')}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-1">TOTAL</span>
                                        <div className="text-3xl font-black text-yellow-400">
                                            {order.total_price} Mt
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Package size={20} /></div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">CLIENTE</span>
                                                <span className="font-bold text-lg">{order.full_name}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="bg-green-100 p-2 rounded-xl text-green-600"><Phone size={20} /></div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">CONTACTO</span>
                                                <span className="font-bold text-lg">{order.phone}</span>
                                                <a
                                                    href={`https://wa.me/258${order.phone}`}
                                                    target="_blank"
                                                    className="block text-xs text-green-600 font-bold hover:underline"
                                                >
                                                    Chamar no WhatsApp
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-purple-100 p-2 rounded-xl text-purple-600"><MapPin size={20} /></div>
                                            <div>
                                                <span className="block text-[10px] font-black uppercase tracking-widest text-gray-400">LOCALIZAÇÃO</span>
                                                <span className="font-bold">{order.province}</span>
                                                <p className="text-sm text-gray-500">{order.delivery_location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-end items-end gap-2">
                                        <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-2xl font-black text-sm uppercase tracking-widest">
                                            <Clock size={16} />
                                            ENTREGA: {order.delivery_priority}
                                        </div>
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-sm uppercase tracking-widest ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                                            }`}>
                                            {order.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div className="text-center py-24 bg-white rounded-3xl border-4 border-dashed border-gray-200">
                            <div className="text-6xl mb-4">🙊</div>
                            <h3 className="text-2xl font-black text-gray-400 uppercase tracking-widest">Nenhum pedido encontrado</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
