import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const { to, subject, message } = req.body;

    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const raw = Buffer.from(
      `To: ${to}\r\nSubject: ${subject}\r\n\r\n${message}`
    ).toString("base64");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
