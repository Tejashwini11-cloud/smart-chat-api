import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const inbox = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10,
    });

    res.status(200).json(inbox.data);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
}
