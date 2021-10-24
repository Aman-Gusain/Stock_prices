// const nodemailer = require('nodemailer');
const cron = require('node-cron');
const express = require('express');
const getPrice = require('./getPrice');
const sendMail = require('./sendMail');

const app = express();

var companies = ['TCS.NS', 'INFY.NS', 'WIPRO.NS', 'RELIANCE.NS'];

const doSomethingAsync = async (item) => {
  return getPrice(item);
};

const getData = async () => {
  return Promise.all(companies.map((item) => doSomethingAsync(item)));
};

cron.schedule('* * * * *', async () => {
  getData().then((data) => {
    console.log(data);
    sendMail(data);
  });
});

app.listen(3000);

// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: 'bar@example.com, baz@example.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world?', // plain text body
//     html: '<b>Hello world?</b>', // html body
//   });

//   console.log('Message sent: %s', info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
