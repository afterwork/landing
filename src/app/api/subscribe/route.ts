import { NextRequest, NextResponse } from 'next/server';
import { setSheetData } from '@/app/api/subscribe/google-sheets.action';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, marketing, focus } = body;

    await setSheetData({
      email,
      name,
      marketing,
      focus,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    console.error('Subscribe API error');
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
