import { NextResponse } from 'next/server';
import { mockHotels } from '@/data/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  let list = mockHotels;
  if (city) {
    list = list.filter((h) => h.city.toLowerCase().includes(city.toLowerCase()) || h.state.toLowerCase().includes(city.toLowerCase()));
  }

  return NextResponse.json({
    success: true,
    total: list.length,
    hotels: list,
  });
}
