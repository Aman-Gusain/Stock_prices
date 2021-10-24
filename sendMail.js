const nodemailer = require('nodemailer');

module.exports = (data) => {
  var body = '';
  data.map((el) => {
    body = body + `<li> ${el.company} == ${el.price}</li>`;
  });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'charles.aman@ithands.com',
      pass: '1501@1999',
    },
  });
  console.log(body);

  const mailOptions = {
    from: 'charles.aman@ithands.com',
    to: 'amn.gusi@gmail.com',
    subject: 'stocks prices',
    html: `<h2>Stock Prices are Below</h2>
              <ul>${body}</ul>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('mail sent successfully');
    }
  });
};
