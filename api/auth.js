import { google } from "googleapis";

export default async function handler(req, res) {
  try {
    const client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI
    );

    const { tokens } = await client.getToken(req.query.code);
    res.status(200).json(tokens);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
