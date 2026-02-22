'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Package, Phone, MapPin, Calendar, Clock, Trash2, CheckCircle, XCircle, Search, Copy, Check } from 'lucide-react';

interface Order {
    id: any;
    _id?: string;
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
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const router = useRouter();

    const fetchOrders = async () => {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

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

                await fetchOrders();
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        checkAuthAndFetch();
    }, [router]);

    const handleUpdateStatus = async (order: Order, newStatus: string) => {
        const id = order._id || order.id;
        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setOrders(prev => prev.map(o => (o._id === id || o.id === id) ? { ...o, status: newStatus } : o));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleDelete = async (order: Order) => {
        const id = order._id || order.id;
        if (!confirm('Tem certeza que deseja apagar esta encomenda?')) return;
        try {
            const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setOrders(prev => prev.filter(o => o._id !== id && o.id !== id));
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleCopy = (order: Order) => {
        const id = order._id || order.id;
        const text = `📦 *NOVA ENCOMENDA*\n\n` +
            `👤 *Cliente:* ${order.full_name}\n` +
            `📞 *Contacto:* ${order.phone}\n` +
            `📍 *Província:* ${order.province}\n` +
            `🏠 *Local:* ${order.delivery_location}\n` +
            `🚚 *Entrega:* ${order.delivery_priority}\n` +
            `💰 *Total:* ${order.total_price} Mt\n` +
            `📅 *Data:* ${new Date(order.created_at).toLocaleDateString('pt-PT')}\n` +
            `⚠️ *Status:* ${order.status.toUpperCase()}`;

        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };


    const filteredOrders = useMemo(() => {
        return orders.filter(order =>
            order.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.phone.includes(searchTerm) ||
            order.delivery_location.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [orders, searchTerm]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 font-black uppercase tracking-[0.5em] text-gray-300">
            Carregando Pedidos...
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 border-b-8 border-black pb-4 gap-4">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                        ENCOMENDAS <span className="text-red-600">RECEBIDAS</span>
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="PESQUISAR NOME OU TELEFONE..."
                                className="pl-10 pr-4 py-2 border-2 border-black rounded-full font-bold focus:ring-4 focus:ring-yellow-100 outline-none w-64 uppercase text-xs"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="bg-black text-white px-6 py-2 rounded-full font-black text-xl">
                            {filteredOrders.length}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-black group hover:-translate-y-1 transition-transform relative">
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
                                                <div className="flex flex-col gap-1">
                                                    {order.phone.split(',').map((num, i) => (
                                                        <div key={i}>
                                                            <span className="font-bold text-lg">{num.trim()}</span>
                                                            <a
                                                                href={`https://wa.me/258${num.trim().replace(/\s/g, '')}`}
                                                                target="_blank"
                                                                className="block text-xs text-green-600 font-bold hover:underline"
                                                            >
                                                                Chamar no WhatsApp
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
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

                                    <div className="flex flex-col justify-between items-end gap-2">
                                        <div className="flex flex-col items-end gap-2">
                                            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest">
                                                <Clock size={14} />
                                                ENTREGA: {order.delivery_priority}
                                            </div>
                                            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest ${order.status === 'pago' ? 'bg-green-100 text-green-700' :
                                                order.status === 'cancelado' ? 'bg-gray-100 text-gray-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status}
                                            </div>
                                        </div>

                                        {/* Ações */}
                                        <div className="flex items-center gap-2 mt-4">
                                            <button
                                                onClick={() => handleCopy(order)}
                                                className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors border-2 border-transparent focus:border-black group"
                                                title="Copiar Detalhes"
                                            >
                                                {copiedId === (order._id || order.id) ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(order, 'pago')}
                                                className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors border-2 border-transparent focus:border-green-600"
                                                title="Marcar como Pago"
                                            >
                                                <CheckCircle size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(order, 'cancelado')}
                                                className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors border-2 border-transparent focus:border-red-600"
                                                title="Cancelar Pedido"
                                            >
                                                <XCircle size={20} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(order)}
                                                className="p-3 bg-black text-white rounded-xl hover:bg-red-600 transition-colors"
                                                title="Apagar"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredOrders.length === 0 && (
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

