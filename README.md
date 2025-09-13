This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Google Apps Script (Web App) for `/api/subscribe`

1. Create a Google Sheet with columns: `Timestamp`, `Name`, `Email`, `Comment`, `Consent`.
2. Open Extensions → Apps Script and paste the code below. Replace `SHEET_ID`.

```javascript
const SHEET_ID = 'YOUR_SHEET_ID_HERE';

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const { name = '', email = '', comment = '', consent = false } = body;
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheets()[0];
    const ts = new Date();
    sheet.appendRow([
      ts,
      name,
      email,
      comment,
      consent === true ? 'Yes' : 'No',
    ]);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Deploy → "Web app" → Execute as Me → Who has access: Anyone with the link. Copy the URL.
4. Set env var `GAS_WEB_APP_URL` to the copied URL in Vercel.

## Deployment (Vercel)

1. Push to GitHub and import repo into Vercel.
2. Add Environment Variable `GAS_WEB_APP_URL`.
3. Ensure `public/og.png` exists (1200x630). Update `metadataBase` if using a custom domain.
