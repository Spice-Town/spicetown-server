const Mailgun = require('mailgun-js');

const mailgun = new Mailgun({ apiKey: process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN });

async function sendEmail(req, res) {
  try {
    let { name, input, issue, contactMethod, checks } = req.body;

    console.log(req.body);

    if (issue === '') {
      issue = 'none';
    }

    let checkedIssues = Object.fromEntries(
      Object.entries(checks).filter(([key, value]) => value === true),
    );

    if (Object.keys(checkedIssues).length === 0) {
      checkedIssues = 'none checked';
    } else {
      checkedIssues = Object.fromEntries(
        Object.entries(checkedIssues).map(([key, value]) => [camelCaseToTitleCase(key), value]),
      );
      
      const separatorMap = {
        'Setup Maintenance': '/',
        'Nut Saddle': '/',
      };

      checkedIssues = Object.fromEntries(
        Object.entries(checkedIssues).map(([key, value]) => {
          const separator = separatorMap[key] || ' ';
          const newKey = key.replace(' ', separator);
          return [newKey, value];
        }),
      );
    }

    const checkedIssuesList = Object.keys(checkedIssues).join(', ');

    const msg = {
      to: 'spicetownguitars@gmail.com',
      from: 'repair@spicetownguitars.com',
      subject: 'Repair Request from ' + name,
      text: `
        Name: ${name}
        ${contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1)}: ${input}
        Issue Description: ${issue}
        Checked Issues: ${checkedIssuesList}`,
      html: `
        <p>
          Name: ${name}
        </p>
        <p>
          ${contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1)}: ${input}
        </p>
        <p>
          Issue: ${issue}
        </p>
        <p>
          Checked Issues: ${checkedIssuesList}
        </p>
      `,
    };

    console.log(msg);

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

function camelCaseToTitleCase(str) {
  const words = str.split(/(?=[A-Z])/);

  return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

module.exports = { sendEmail };
