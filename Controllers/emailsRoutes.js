const Mailgun = require('mailgun-js');

const mailgun = new Mailgun({ apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN });

async function sendEmail(req, res) {
  try {
    let { name, phone, issue, checks } = req.body;

    if (issue === undefined) {
      issue = 'none';
    }

    if (checks === undefined) {
      checks = 'none';
    }

    const msg = {
      to: 'spicetownguitars@gmail.com',
      from: 'repair@spicetownguitars.com',
      subject: 'Repair Requst from ' + name,
      text: `
      Name: ${name}
      Phone Number: ${phone}
      Issue Desciption: ${issue}
      Checked Issues: ${checks}`,
      html: `
      <p>
      Name: ${name}
      </p>
      <p>
      Phone Number: ${phone}
      </p>
      <p>
      Issue: ${issue}
      </p>
      <p>
      Checked Issues: ${checks}
      </p>
      `,
    };


    mailgun.messages().send(msg, (error, body) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: 'An error occurred' });
      } else {
        res.send({ message: 'Email sent successfully', msg });
        console.log(msg.text);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email' });
  }
}

module.exports = { sendEmail };
