import { NextResponse } from 'next/server';
import { mockPackages } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({
    success: true,
    total: mockPackages.length,
    packages: mockPackages,
  });
}
