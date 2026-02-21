'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                router.push('/orders');
                router.refresh();
            } else {
                setError('Senha incorrecta. Tente novamente.');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border-4 border-black p-8 md:p-12">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-black text-white rounded-3xl mb-4 shadow-lg">
                        <Lock size={40} />
                    </div>
                    <h1 className="text-3xl font-black uppercase tracking-tighter">Acesso Restrito</h1>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mt-2">Área de Encomendas</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Digite a Senha</label>
                        <div className="relative">
                            <input
                                required
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-5 bg-gray-50 border-4 border-gray-100 rounded-2xl focus:border-black outline-none transition-all font-bold text-lg"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                            >
                                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-black text-xs uppercase border-2 border-red-100 animate-pulse">
                            {error}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-black text-white p-6 rounded-2xl font-black text-xl uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50"
                    >
                        {loading ? 'Entrando...' : 'Entrar Agora'}
                    </button>
                </form>

                <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.3em] mt-12">
                    Saintciaga Moçambique • Admin Panel
                </p>
            </div>
        </div>
    );
}
