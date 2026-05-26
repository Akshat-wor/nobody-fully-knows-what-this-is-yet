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

    // ── Write headers on the first row if the sheet is empty ─
    if (sheet.getLastRow() === 0) {
      var headers = ['Timestamp'].concat(Object.keys(data));
      sheet.appendRow(headers);

      // Bold the header row
      sheet.getRange(1, 1, 1, headers.length)
           .setFontWeight('bold');
    }

    // ── Build the data row ──────────────────────────────────
    // Get existing headers (excluding Timestamp) to maintain column order
    var existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn())
                                .getValues()[0];

    var row = existingHeaders.map(function(header) {
      if (header === 'Timestamp') {
        return new Date().toLocaleString();
      }
      return data[header] || '';
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
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
