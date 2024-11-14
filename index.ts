import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';
import * as dotenv from 'dotenv';

dotenv.config();

const TOKEN: string = process.env.TELEGRAM_BOT_TOKEN!;
const CHAT_ID: string | number = process.env.TELEGRAM_CHAT_ID!;

const bot = new TelegramBot(TOKEN, { polling: true });

const messageText = 'Danas je dan za smece!!!';

const sendMessage = async () => {
  try {
    const response = await bot.sendMessage(CHAT_ID, messageText, { message_thread_id: Number.parseInt(process.env.TELEGRAM_MESSAGE_THREAD_ID!) });
    console.log('Message sent', response);
    return;
  } catch (error) {
    console.error("Failed to send message:", error);
    return;
  }
}
// Scheduling a message for Monday and Thursday at noon CET (Central European Time)
// "0 12 * * 1,4" means noon (12:00) on Mondays (1) and Thursdays (4)
cron.schedule('0 12 * * 1,4', () => {
  sendMessage().then(() => {
    console.log("Scheduled message sent");
  }).catch((error) => {
    console.error("Failed to send message:", error)
  });
});
