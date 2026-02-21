import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_PASSWORD = 'saint123'; // Senha básica solicitada

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

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
