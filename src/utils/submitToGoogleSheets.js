// ============================================================
// Google Sheets Submission Utility
// ============================================================
// Paste your deployed Google Apps Script Web App URL below.
// Leave empty to run in demo mode (logs to console instead).
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzcWYk-EJ4Bhi4Lkek8JKZiqIBPkGO-8WZ5LY1tQ3KaV4t3ZQ7M3e83-GsjLrbUsNQ00g/exec';

/**
 * Submits form answers to a Google Sheet via a deployed Apps Script Web App.
 *
 * @param {Record<string, string>} answers — An object of { questionId: answer } pairs.
 * @returns {Promise<{ success: boolean, error?: string }>}
 */
export async function submitToGoogleSheets(answers) {
  // ── Demo mode ──────────────────────────────────────────────
  if (!GOOGLE_SCRIPT_URL) {
    console.log(
      '%c[Demo Mode] Form submission data:',
      'color: #a78bfa; font-weight: bold;',
      answers
    );
    // Simulate a small network delay so the loading state is visible
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { success: true };
  }

  // ── Production mode ────────────────────────────────────────
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      // We send as text/plain to avoid CORS preflight with Apps Script
      body: JSON.stringify(answers),
    });

    return { success: true };
  } catch (error) {
    console.error('[submitToGoogleSheets] Fetch error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
