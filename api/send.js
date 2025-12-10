import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: req.headers.token });

    const gmail = google.gmail({ version: "v1", auth });

    const encodedMessage = Buffer.from(req.body.message)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: encodedMessage }
    });

    res.status(200).json({ status: "sent" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
