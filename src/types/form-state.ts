export type SubscribeFormState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
};

export const initialFormState: SubscribeFormState = { status: 'idle' };
