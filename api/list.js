import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: req.headers.token });

    const gmail = google.gmail({ version: "v1", auth });

    const messages = await gmail.users.messages.list({
      userId: "me",
      maxResults: 10
    });

    res.status(200).json(messages.data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
