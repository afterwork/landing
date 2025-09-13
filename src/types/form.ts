export type SubscribePayload = {
  email: string;
  name?: string;
  comment?: string;
  consent: boolean;
  /** Honeypot field - must be empty */
  company?: string;
};

export type ApiResponse = {
  ok: boolean;
  error?: string;
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
