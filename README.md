# Nobody fully knows what this is yet.

A beautiful, interactive, and slightly chaotic React-based hiring/survey form. It is built to feel nothing like a corporate form—featuring a dark, glassmorphic aesthetic, custom dropdowns, and highly specific internet-culture questions.

## Features
- **Dynamic Form UI**: Custom built inputs, checkboxes, and select dropdowns styled with CSS.
- **Google Sheets Integration**: Seamlessly submits data directly to a Google Sheet via a Google Apps Script Web App.
- **Framer Motion**: Smooth, micro-animations for an engaging user experience.
- **Vite & React**: Fast local development and optimized production builds.

## Tech Stack
- React
- Vite
- Framer Motion
- Vanilla CSS
- Google Apps Script (Backend)

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Akshat-wor/nobody-fully-knows-what-this-is-yet.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Google Sheets Integration
This app uses `no-cors` POST requests to bypass browser restrictions when sending data to Google Apps Script. 

If you want to set up your own sheet:
1. Create a Google Sheet.
2. Go to **Extensions > Apps Script** and deploy your script as a **Web App**.
3. Ensure **Who has access** is set to **"Anyone"**.
4. Paste the resulting URL into the `GOOGLE_SCRIPT_URL` variable in `src/utils/submitToGoogleSheets.js`.
