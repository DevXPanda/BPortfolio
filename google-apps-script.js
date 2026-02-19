// ============================================
// GOOGLE APPS SCRIPT — Paste this in your Google Sheet's Script Editor
// ============================================
// 
// HOW TO SET UP:
// 1. Create a new Google Sheet
// 2. Name Sheet1 tab as "ContactForm" (or it will auto-create)
// 3. Go to Extensions → Apps Script
// 4. Delete everything and paste this code
// 5. Click Deploy → New Deployment
// 6. Select Type: "Web App"
// 7. Set "Execute as" → Me
// 8. Set "Who has access" → Anyone
// 9. Click Deploy and copy the Web App URL
// 10. Paste that URL in main.js (replace YOUR_WEB_APP_URL_HERE)
//
// IMPORTANT: After any code change, create a NEW deployment (not update)
// ============================================

// Handle GET requests (form data comes as URL query parameters)
function doGet(e) {
    try {
        var name = e.parameter.name || '';
        var email = e.parameter.email || '';
        var subject = e.parameter.subject || 'No Subject';
        var message = e.parameter.message || '';
        var timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        // If no data, return status
        if (!name && !email && !message) {
            return ContentService
                .createTextOutput(JSON.stringify({ status: 'ok', message: 'Priya Yadav Portfolio Contact API is running!' }))
                .setMimeType(ContentService.MimeType.JSON);
        }

        // ---- Save to Google Sheet ----
        var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ContactForm');

        // Create sheet with headers if it doesn't exist
        if (!sheet) {
            sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('ContactForm');
            sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);

            // Style the header row
            var headerRange = sheet.getRange(1, 1, 1, 5);
            headerRange.setFontWeight('bold');
            headerRange.setBackground('#FFE0E8');
        }

        // Append the form data
        sheet.appendRow([timestamp, name, email, subject, message]);

        // ---- Send Email Notification ----
        var recipientEmail = 'priyayadav66263@gmail.com';

        var emailSubject = '🌸 New Portfolio Contact: ' + subject;

        var emailBody =
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '  📬 NEW CONTACT FORM SUBMISSION\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
            '👤 Name:     ' + name + '\n' +
            '📧 Email:    ' + email + '\n' +
            '📝 Subject:  ' + subject + '\n' +
            '🕐 Time:     ' + timestamp + '\n\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '  💬 MESSAGE\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n' +
            message + '\n\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
            '  📌 Reply directly to: ' + email + '\n' +
            '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';

        var htmlBody =
            '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">' +
            '<div style="background: linear-gradient(135deg, #FFC2D1, #FF6B8A); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">' +
            '<h2 style="color: #fff; margin: 0;">📬 New Contact Form Submission</h2>' +
            '</div>' +
            '<div style="background: #FFF5F7; padding: 24px; border: 1px solid #FFE0E8;">' +
            '<table style="width: 100%; border-collapse: collapse;">' +
            '<tr><td style="padding: 8px 12px; font-weight: bold; color: #7A1F3C; width: 100px;">Name:</td><td style="padding: 8px 12px; color: #4A3F44;">' + name + '</td></tr>' +
            '<tr><td style="padding: 8px 12px; font-weight: bold; color: #7A1F3C;">Email:</td><td style="padding: 8px 12px;"><a href="mailto:' + email + '" style="color: #E8507A;">' + email + '</a></td></tr>' +
            '<tr><td style="padding: 8px 12px; font-weight: bold; color: #7A1F3C;">Subject:</td><td style="padding: 8px 12px; color: #4A3F44;">' + subject + '</td></tr>' +
            '<tr><td style="padding: 8px 12px; font-weight: bold; color: #7A1F3C;">Time:</td><td style="padding: 8px 12px; color: #4A3F44;">' + timestamp + '</td></tr>' +
            '</table>' +
            '</div>' +
            '<div style="background: #fff; padding: 24px; border: 1px solid #FFE0E8; border-top: none;">' +
            '<h3 style="color: #7A1F3C; margin: 0 0 12px;">Message:</h3>' +
            '<p style="color: #4A3F44; line-height: 1.6; white-space: pre-wrap;">' + message + '</p>' +
            '</div>' +
            '<div style="background: #FFF0F3; padding: 16px 24px; border-radius: 0 0 12px 12px; border: 1px solid #FFE0E8; border-top: none; text-align: center;">' +
            '<p style="color: #9A8D93; font-size: 13px; margin: 0;">Reply to <a href="mailto:' + email + '" style="color: #E8507A;">' + email + '</a></p>' +
            '</div>' +
            '</div>';

        GmailApp.sendEmail(recipientEmail, emailSubject, emailBody, {
            htmlBody: htmlBody,
            replyTo: email,
            name: 'Priya Yadav Portfolio'
        });

        // Return success
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'success', message: 'Form submitted successfully!' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Handle POST requests as fallback
function doPost(e) {
    try {
        var data = JSON.parse(e.postData.contents);

        // Create a fake parameter object and call doGet
        e.parameter = {
            name: data.name || '',
            email: data.email || '',
            subject: data.subject || 'No Subject',
            message: data.message || ''
        };

        return doGet(e);
    } catch (error) {
        return ContentService
            .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
