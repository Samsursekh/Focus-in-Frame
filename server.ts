import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import cors from "cors";
import twilio from "twilio";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Twilio Lazy Initialization
  let twilioClient: any = null;
  function getTwilio() {
    if (!twilioClient) {
      const sid = process.env.VITE_TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      if (!sid || !token) {
        throw new Error("Twilio credentials (SID or Auth Token) are missing in environment variables.");
      }
      twilioClient = twilio(sid, token);
    }
    return twilioClient;
  }

  // API Routes
  app.post("/api/inquiry", async (req, res) => {
    const { name, email, phone, date, location, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required" });
    }

    // Configure Mailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true for 465, false for 587
      debug: true,
      logger: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      const info = await transporter.sendMail({
        from: `"Focus in Frame Inquiry" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || "hello@focusinframe.com",
        subject: `New Inquiry from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Event Date: ${date || "Not specified"}
Location: ${location || "Not specified"}
Message: ${message}
        `,
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #111;">
            <h2 style="color: #00C4CC;">New Studio Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Event Date:</strong> ${date || "Not specified"}</p>
            <p><strong>Location:</strong> ${location || "Not specified"}</p>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #00C4CC;">
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
          </div>
        `,
      });

      console.log("Message sent: %s", info.messageId);

      // Send SMS Confirmation to User
      try {
        const client = getTwilio();
        await client.messages.create({
          body: `Hi ${name}, thank you for reaching out to Focus in Frame. Your inquiry has been received! We'll get back to you shortly.`,
          from: process.env.VITE_TWILIO_PHONE_NUMBER,
          to: phone,
        });
      } catch (smsError) {
        console.error("Failed to send confirmation SMS:", smsError);
        // We don't fail the whole request if just the confirmation SMS fails
      }

      res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
