export type SubscribePayload = {
  email: string;
  name: string;
  marketing: boolean;
  focus: boolean;
};

export type ApiResponse = {
  ok: boolean;
  error?: string;
};

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
