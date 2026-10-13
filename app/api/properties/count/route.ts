import { NextRequest, NextResponse } from 'next/server';
import { parseHomeParams } from '@/lib/home-params';
import { getPropertiesCount } from '@/lib/properties';

export async function GET(request: NextRequest) {
  const searchParams = Object.fromEntries(request.nextUrl.searchParams.entries());
  const filters = parseHomeParams(searchParams);
  const count = await getPropertiesCount(filters);

  return NextResponse.json({ count });
}
