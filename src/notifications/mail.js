const nodemailer = require("nodemailer");

const config = require("../config");

const logger = require("../log/winston");

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: config.mail.GMAIL_ADDRESS,
        pass: config.mail.GMAIL_PWD
      }
    });
  }

  async orderSaved(template, email, firstName) {
    const mailOptions = {
      from: "<no-reply@ecoderce.com>",
      to: email,
      subject: `Thanks for your order ${firstName}, ${email}`,
      text: "Order successfully received",
      html: template
    };
    const response = await this.transporter.sendMail(mailOptions);
    logger.info(`Order successfully received: ${response.messageId}`);
  }

  async OrderSent(template, email, firstName) {
    const mailOptions = {
      from: "<no-reply@ecoderce.com>",
      to: email,
      subject: `Order sent to ${firstName}, ${email}`,
      text: "Order successfully sent",
      html: template
    };
    const response = await this.transporter.sendMail(mailOptions);
    logger.info(`Mail sent ${response.envelope}`);
  }

  async aNewUserMail(template) {
    const mailOptions = {
      to: config.mail.GMAIL_ADDRESS,
      subject: `New user registered`,
      text: `A new user has registered to Ecoderce`,
      html: template
    };
    const response = await this.transporter.sendMail(mailOptions);
    logger.info("New user registered", response.envelope);
  }
}

module.exports = new MailSender();
