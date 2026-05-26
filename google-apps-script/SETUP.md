# Google Sheets Integration — Setup Guide

Connect your Typeform-style form to a Google Sheet so every submission is saved automatically.

---

## Step-by-Step Setup

### 1. Create a Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it something like `Form Submissions`

### 2. Open Apps Script

1. In your new Sheet, click **Extensions → Apps Script**
2. This opens the Apps Script editor in a new tab

### 3. Add the Script

1. Delete any existing code in the editor
2. Copy the entire contents of `Code.gs` from this folder
3. Paste it into the Apps Script editor
4. Click **💾 Save** (or `Cmd + S`)

### 4. Deploy as a Web App

1. Click **Deploy → New deployment**
2. Click the ⚙️ gear icon next to "Select type" and choose **Web app**
3. Fill in:
   - **Description**: `Form submission endpoint`
   - **Execute as**: `Me (your-email@gmail.com)`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. You may be asked to authorize — click **Review Permissions**, select your account, and click **Allow**
6. **Copy the Web App URL** that appears — you'll need this!

### 5. Connect to Your React App

1. Open `src/utils/submitToGoogleSheets.js`
2. Find this line at the top:
   ```js
   const GOOGLE_SCRIPT_URL = '';
   ```
3. Paste your Web App URL between the quotes:
   ```js
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
   ```
4. Save the file

### 6. Test It

1. Run your React app (`npm run dev`)
2. Fill out the form and submit
3. Check your Google Sheet — a new row should appear!

---

## Troubleshooting

### "TypeError: Failed to fetch"
- Make sure **Who has access** is set to **Anyone** (not "Anyone with Google account")
- Re-deploy after making changes — the URL stays the same only for version updates

### Data shows up in wrong columns
- Delete all rows in the sheet (including headers) and submit again
- The script auto-creates headers on the first submission

### Changes to Code.gs don't take effect
- You must create a **New deployment** (or update the existing one) after editing the script
- Go to **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**

### "Authorization required" error
- Click **Review Permissions** and allow access
- If you see "This app isn't verified", click **Advanced → Go to (project name) (unsafe)**

### CORS errors
- The script uses `text/plain` content type to avoid CORS preflight
- If you still see CORS errors, make sure you're using the `/exec` URL (not `/dev`)

---

## How It Works

```
React App  →  POST JSON  →  Google Apps Script  →  Google Sheet
                               (Web App)
```

1. User fills out the form
2. On submit, answers are serialized to JSON
3. `fetch()` sends a POST request to the Apps Script URL
4. The script parses the JSON, creates headers if needed, and appends a new row
5. A success/error JSON response is returned to the app
