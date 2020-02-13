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

const yesText = `
Thank you for responding!

Event Details:
Saturday, June 20, 2020
5:30pm – 11pm
Bruentrup Heritage Farm
2170 County Rd D E
Maplewood, MN 55109

For any questions, please contact info@MiragliaQuirin2020.com
`;

const yesHtml = `
<h3>Thank you for responding!</h3>
<h5>Event Details</h5>
<div>
  <strong>Saturday, June 20, 2020</strong><br />
  5:30pm – 11pm
<address>
  Bruentrup Heritage Farm<br />
  2170 County Rd D E<br />
  Maplewood, MN 55109<br />
</address>
</div>
<p>For any questions, please contact <a href="mailto:info@MiragliaQuirin2020.com">info@MiragliaQuirin2020.com</a></p>
`;

const notAttendingBody = params => {
  const { email, primaryName, attending, guests, notes } = params;

  return {
    Text: `Thank you for responding! We're sorry you can't join us, but we're so grateful to have you in our lives!`,
    Html: `<h3>Thank you for responding!</h3><p>We're sorry you can't join us, but we're so grateful to have you in our lives!</p>`
  };
};

const attendingBody = params => {
  const { email, primaryName, attending, guests, notes } = params;

  return {
    Text: yesText,
    Html: yesHtml
  };
};

const generateEmailBody = params => {
  const { attending } = params;
  if (!attending) {
    throw new Error('"attending" param must be set');
  }

  return attending === 'no' ? notAttendingBody(params) : attendingBody(params);
};

const sendEmail = params => {
  return ses
    .sendEmail({
      Source: fromAddr,
      Destination: {
        ToAddresses: [params.email]
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: 'Thank you for responding!'
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
  console.log('body', event.body);

  if (event['httpMethod'] !== 'POST') {
    return new Error(`Unexpected HTTP method "${event['httpMethod']}"`);
  }

  const body = JSON.parse(event.body);
  const data = body.data || body;

  if (!data.email) {
    console.log('No email address found', data);
    return {
      statusCode: 200,
      body: 'skipped'
    };
  }

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
