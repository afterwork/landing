import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      name = '',
      comment = '',
      consent,
      company = '',
    } = body ?? {};

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email' },
        { status: 400 }
      );
    }
    if (company) {
      return NextResponse.json(
        { ok: false, error: 'Bot detected' },
        { status: 400 }
      );
    }
    if (consent !== true) {
      return NextResponse.json(
        { ok: false, error: 'Consent required' },
        { status: 400 }
      );
    }

    const url = process.env.GAS_WEB_APP_URL;
    if (!url) {
      return NextResponse.json(
        { ok: false, error: 'Server misconfigured' },
        { status: 500 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, comment, consent }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!res.ok) {
        const text = await res.text();
        return NextResponse.json(
          { ok: false, error: text || 'Upstream error' },
          { status: 502 }
        );
      }
      const data = await res.json().catch(() => ({ ok: true }));
      if (data && data.ok) {
        return NextResponse.json({ ok: true }, { status: 200 });
      }
      return NextResponse.json(
        { ok: false, error: 'Unexpected response' },
        { status: 502 }
      );
    } catch (e: unknown) {
      clearTimeout(timeout);
      const message = e instanceof Error ? e.message : 'Request failed';
      return NextResponse.json({ ok: false, error: message }, { status: 504 });
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON' },
      { status: 400 }
    );
  }
}
