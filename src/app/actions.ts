'use server';

import { headers } from 'next/headers';
import type { ApiResponse } from '@/types/form';
import { EMAIL_REGEX } from '@/types/form';
import type { SubscribeFormState } from '@/types/form-state';

export async function subscribeAction(
  _prevState: SubscribeFormState,
  formData: FormData
): Promise<SubscribeFormState> {
  const email = String(formData.get('email') ?? '');
  const name = String(formData.get('name') ?? '');
  const marketing = formData.get('marketing') === 'on';
  const focus = formData.get('focus') === 'on';
  const company = String(formData.get('company') ?? ''); // honeypot

  if (!EMAIL_REGEX.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' };
  }
  if (!marketing || !focus) {
    return {
      status: 'error',
      message: 'Please agree to both statements to continue.',
    };
  }

  try {
    const headersList = await headers();
    const host =
      headersList.get('x-forwarded-host') ?? headersList.get('host') ?? '';
    const proto = headersList.get('x-forwarded-proto') ?? 'http';
    const base = host
      ? `${proto}://${host}`
      : (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000');

    const res = await fetch(`${base}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, consent: true, company }),
      cache: 'no-store',
    });

    const json = (await res.json().catch(() => ({ ok: false }))) as ApiResponse;
    if (res.ok && json.ok) {
      return {
        status: 'success',
        message: 'Thanks! You are on the list. We will be in touch soon.',
      };
    }
    return {
      status: 'error',
      message: json?.error || 'Something went wrong. Please try again.',
    };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : 'Network error';
    return { status: 'error', message };
  }
}
