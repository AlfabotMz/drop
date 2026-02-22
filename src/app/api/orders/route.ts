import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    await connectDB();
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

    const newOrder = await Order.create({
      full_name,
      phone,
      province,
      delivery_location,
      delivery_priority,
      total_price,
      product_id,
      quantity,
      status: 'pending'
    });

    console.log('Order Result:', newOrder);

    return NextResponse.json({
      success: true,
      orderId: newOrder._id
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
    await connectDB();
    const orders = await Order.find().sort({ created_at: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Fetch Orders Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

