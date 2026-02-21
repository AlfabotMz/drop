import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      full_name,
      phone,
      province,
      delivery_location,
      delivery_priority,
      total_price,
      product_id,
      quantity = 1
    } = body;

    if (!full_name || !phone || !province || !delivery_location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Order Body:', body);

    const stmt = db.prepare(`
      INSERT INTO orders (full_name, phone, province, delivery_location, delivery_priority, total_price, product_id, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      full_name,
      phone,
      province,
      delivery_location,
      delivery_priority,
      total_price,
      product_id,
      quantity
    );

    console.log('Order Result:', result);

    return NextResponse.json({
      success: true,
      orderId: result.lastInsertRowid
    });
  } catch (error) {
    console.error('SERVER Order Submission Error OBJECT:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const stmt = db.prepare('SELECT * FROM orders ORDER BY created_at DESC');
    const orders = stmt.all();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Fetch Orders Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
