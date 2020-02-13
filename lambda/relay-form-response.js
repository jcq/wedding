const { encodeWords } = require('libmime');

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

const ses = new AWS.SES({
  region: process.env['MY_AWS_REGION'] || 'us-east-1',
  credentials: new AWS.Credentials(
    process.env['MY_AWS_ACCESS_KEY_ID'],
    process.env['MY_AWS_SECRET_ACCESS_KEY']
  )
});

const fromAddr =
  process.env['EMAIL_AUTO_FROM'] ||
  'Miraglia / Quirin 2020 <info@miragliaquirin2020.com>';

const generateEmailBody = params => {
  const { email, primaryName, attending, guests, notes } = params;
  if (!attending) {
    throw new Error('"attending" param must be set');
  }

  const Html = `
    <table>
      <thead>
        <tr>
          <td>Field</td>
          <td>Response</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Name</td>
          <td>${primaryName}</td>
        </tr>
        <tr>
          <td>Attending</td>
          <td>${attending}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${email}</td>
        </tr>
        <tr>
          <td>Guests</td>
          <td>${guests}</td>
        </tr>
        <tr>
          <td>Notes</td>
          <td>${notes}</td>
        </tr>
      </tbody>
    </html>
  `;

  const Text = `
    Primary Name: ${primaryName}\n
    Attending: ${attending}\n
    Email: ${email}\n
    Guests: ${guests}\n
    Notes: ${notes}\n
  `;

  return { Text, Html };
};

const sendEmail = params => {
  const { primaryName, attending } = params;

  return ses
    .sendEmail({
      Source: fromAddr,
      Destination: {
        ToAddresses: ['rsvp@miragliaquirin2020.com']
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: `Wedding Form Response: ${primaryName} — ${attending}`
        },
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: generateEmailBody(params)['Text']
          },
          Html: {
            Charset: 'UTF-8',
            Data: generateEmailBody(params)['Html']
          }
        }
      }
    })
    .promise();
};

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
module.exports.handler = async function(event, context) {
  if (event['httpMethod'] !== 'POST') {
    return new Error(`Unexpected HTTP method "${event['httpMethod']}"`);
  }

  const body = JSON.parse(event.body);
  const data = body.data || body;

//   if (!data.email) {
//     return {
//       statusCode: 200,
//       body: 'skipped'
//     };
//   }

  try {
    const res = await sendEmail(data);
    return {
      statusCode: 200,
      body: 'success'
    };
  } catch (error) {
    console.error('Error in sendEmail', error);
    return {
      statusCode: 400,
      body: 'Error: ' + error
    };
  }
};
