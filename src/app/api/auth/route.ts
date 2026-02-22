import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/mongodb';
import Setting from '@/models/Setting';

const DEFAULT_ADMIN_PASSWORD = 'saint123'; // Senha padrão se não houver no banco

export async function POST(request: Request) {
    try {
        await connectDB();
        const { password } = await request.json();

        // Buscar a senha configurada no banco de dados
        let adminSetting = await Setting.findOne({ key: 'admin_password' });

        // Se não existir, criar com a senha padrão (primeira vez)
        if (!adminSetting) {
            adminSetting = await Setting.create({
                key: 'admin_password',
                value: DEFAULT_ADMIN_PASSWORD
            });
        }

        const ADMIN_PASSWORD = adminSetting.value;

        if (password === ADMIN_PASSWORD) {
            const cookieStore = await cookies();
            cookieStore.set('admin_session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7, // 1 semana
                path: '/',
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, error: 'Senha incorreta' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Auth Error:', error);
        return NextResponse.json(
            { success: false, error: 'Erro interno' },
            { status: 500 }
        );
    }
}

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (session?.value === 'authenticated') {
        return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false });
}

