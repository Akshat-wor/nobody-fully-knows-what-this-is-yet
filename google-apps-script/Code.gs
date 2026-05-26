// ============================================================
// Google Apps Script — Web App for receiving form submissions
// ============================================================
//
// This script receives POST requests from the Typeform-style
// React app and writes each submission as a new row in the
// active Google Sheet.
//
// Deploy as:  Web App  →  Execute as: Me  →  Access: Anyone
// ============================================================

/**
 * Explicit column order matching the question IDs in questions.js.
 * Update this array whenever the form questions change.
 */
var COLUMNS = [
  'name',
  'email',
  'phone',
  'location',
  'screentime',
  'toxic_trait',
  'strongest_skill',
  'brand_culture',
  'dumb_startup',
  'five_lakh_company',
  'niche_hobby',
  'function_interest',
  'rabbit_holes',
  'culturally_cool',
  'help_with',
  'weekends',
  'not_corporate'
];

/**
 * Handles incoming POST requests (form submissions).
 *
 * The React app sends a JSON body with key/value pairs where
 * each key is a question ID and each value is the user's answer.
 */
function doPost(e) {
  try {
    // ── Parse the incoming JSON payload ──────────────────────
    var data = JSON.parse(e.postData.contents);

    // ── Get the active spreadsheet and the first sheet ──────
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // ── Build the full header list ──────────────────────────
    // Start with Timestamp + known columns, then add any
    // unexpected keys from the payload as bonus columns
    var allHeaders = ['Timestamp'].concat(COLUMNS);
    var extraKeys = Object.keys(data).filter(function(key) {
      return COLUMNS.indexOf(key) === -1;
    });
    allHeaders = allHeaders.concat(extraKeys);

    // ── Write headers on the first row if the sheet is empty ─
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(allHeaders);

      // Bold the header row
      sheet.getRange(1, 1, 1, allHeaders.length)
           .setFontWeight('bold');
    }

    // ── Build the data row ──────────────────────────────────
    // Use the canonical header order so columns always align
    var row = allHeaders.map(function(header) {
      if (header === 'Timestamp') {
        return new Date().toLocaleString();
      }
      var value = data[header];
      // Handle arrays (in case multi-select values arrive as arrays)
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      return value || '';
    });

    // ── Append the row ──────────────────────────────────────
    sheet.appendRow(row);

    // ── Return a success response ───────────────────────────
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data saved successfully',
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // ── Return an error response ────────────────────────────
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests — useful for health checks.
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'ok',
      message: 'Form submission endpoint is active. Use POST to submit data.',
      columns: COLUMNS,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
