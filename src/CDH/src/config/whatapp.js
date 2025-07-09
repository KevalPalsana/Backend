import twilio from "twilio";
import dotenv from "dotenv";
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const sendWhatsApp = async (to, message) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`, 
      to: `whatsapp:${to}`,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to send WhatsApp message: " + error.message);
  }
};

const sendWhatsAppNotification = async (to, message) => {
  return await sendWhatsApp(to, message);
};

export default { sendWhatsApp, sendWhatsAppNotification };
