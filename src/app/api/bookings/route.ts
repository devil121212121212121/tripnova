import { NextResponse } from 'next/server';
import { mockInitialBookings } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: mockInitialBookings.length,
    bookings: mockInitialBookings,
    simulated: true,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const reference = `TN-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = {
      id: `bk-${Date.now()}`,
      reference,
      ...body,
      status: 'Confirmed',
      bookingDate: new Date().toLocaleDateString('en-GB'),
    };

    return NextResponse.json({
      success: true,
      message: 'Simulated booking confirmed successfully.',
      booking: newBooking,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
