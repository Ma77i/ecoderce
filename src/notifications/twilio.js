const twilio = require("twilio");

const config = require("../config");

const logger = require("../log/winston");

class TwilioSender {
  constructor() {
    this.client = twilio(config.twilio.TWILIO_SID, config.twilio.TWILIO_AUTH);
  }

  async sendSms(phone, firstName, email) {
    this.client.messages
      .create({
        body: `Thanks for your order ${firstName}, ${email}, we will notify you when it is shipped:`,
        from: config.twilio.TWILIO_PHONE,
        to: phone
      })
      .then((res) => logger.info(res.body));
  }

  async sendWhatsapp(phone, firstName, email) {
    await this.client.messages
      .create({
        body: `Your order has been sent to your address, thanks ${firstName}, ${email}`,
        mediaUrl: [
          "https://920459.smushcdn.com/2298792/wp-content/uploads/2018/06/gato-feliz.jpg?lossy=1&strip=1&webp=1"
        ],
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phone}`
    })
    .then((res) => logger.info(res.body));
  }
}

module.exports = new TwilioSender();
