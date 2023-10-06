const TelegramBot = require('node-telegram-bot-api');
const ytdl = require('ytdl-core');
const fs = require('fs');
const token = '6356132155:AAGuHxZ97zxaPxfW4MwiF-iqfSOlaEsTiW4'; // Ganti dengan token API bot Anda
const bot = new TelegramBot(token, { polling: true });

// Menangani perintah /downloadvideo
bot.onText(/\/downloadvideo (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const youtubeUrl = match[1]; // Mengambil URL YouTube dari perintah pengguna

  try {
    // Mendapatkan info video dari URL YouTube
    const info = await ytdl.getInfo(youtubeUrl);

    // Mendapatkan format video MP4 terbaik
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });

    // Mengunduh video dari URL YouTube
    const videoStream = ytdl(youtubeUrl, { format });

    // Menyimpan video di server
    const videoFileName = 'video.mp4';
    const videoPath = `../videos/${videoFileName}`;
    const writeStream = fs.createWriteStream(videoPath);
    videoStream.pipe(writeStream);

    videoStream.on('end', () => {
      // Mengirim video ke pengguna
      bot.sendVideo(chatId, videoPath, { caption: 'Ini video MP4 yang Anda unduh dari YouTube.' });
    });
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Maaf, ada masalah saat mengunduh video dari YouTube.');
  }
});

// Menangani perintah /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Selamat datang! Kirimkan perintah /downloadvideo [URL_YOUTUBE] untuk mengunduh video MP4 dari YouTube.');
});

// Menangani pesan yang tidak sesuai perintah
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Perintah tidak valid. Kirimkan perintah /downloadvideo [URL_YOUTUBE] untuk mengunduh video MP4 dari YouTube.');
});
                                             
