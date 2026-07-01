export class TelegramBot {
  constructor(token) {
    this.token = token;
  }

  async sendMessage(chatId, message) {
    console.log("Telegram Message");
    console.log("----------------");
    console.log(`Chat ID: ${chatId}`);
    console.log(message);

    return true;
  }
}
