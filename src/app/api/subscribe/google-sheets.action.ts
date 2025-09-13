'use server';
import { google } from 'googleapis';
import { SubscribePayload } from '@/types/form';

export async function setSheetData(data: SubscribePayload) {
  const glAuth = await google.auth.getClient({
    projectId: process.env.GOOGLE_PROJECT_ID,
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      universe_domain: 'googleapis.com',
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const glSheets = google.sheets({ version: 'v4', auth: glAuth });

  return await glSheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    auth: glAuth,
    range: 'A1:D1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[data.name, data.email, data.marketing, data.focus]],
    },
  });
}
