const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = 'YOUR_BOT_TOKEN'; // Ganti dengan token API bot Anda
const bot = new TelegramBot(token, { polling: true });

// Menangani perintah /download
bot.onText(/\/download (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const videoUrl = match[1]; // Mengambil URL video dari perintah pengguna

  try {
    // Mengunduh video dari URL menggunakan Axios
    const response = await axios.get(videoUrl, { responseType: 'stream' });

    // Mengirim video ke pengguna
    bot.sendVideo(chatId, response.data, { caption: 'Ini video yang Anda unduh.' });
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Maaf, ada masalah saat mengunduh video.');
  }
});

// Menangani perintah /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Selamat datang! Kirimkan perintah /download [URL_VIDEO] untuk mengunduh video MP4.');
});

// Menangani pesan yang tidak sesuai perintah
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Perintah tidak valid. Kirimkan perintah /download [URL_VIDEO] untuk mengunduh video MP4.');
});
  
