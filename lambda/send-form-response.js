const { encodeWords } = require('libmime');

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});


const ses = new AWS.SES({
  region: process.env['MY_AWS_REGION'] || 'us-east-1',
  credentials: new AWS.Credentials(
    process.env['MY_AWS_ACCESS_KEY_ID'],
    process.env['MY_AWS_SECRET_ACCESS_KEY']
  )
});

const fromAddr =
  process.env['EMAIL_AUTO_FROM'] || 'info@miragliaquirin2020.com';

/** @typedef {function(Error=,Object=)} */
var NetlifyCallback;

/**
 * Calls the callback so that it redirects to question form URL.
 *
 * Optional code can be specified. This code is set as a fragment part
 * of the redirect location.
 *
 * @param {!NetlifyCallback} callback
 * @param {string=} code
 */
function redir(callback, code) {
  //   callback(null, {
  //     statusCode: 303,
  //     headers: {
  //       Location: process.env['QUESTION_FORM_URL'] + (code ? `#${code}` : '')
  //     }
  //   });
  callback(null, { statusCode: 200, body: 'moooo' });
}

const notAttendingBody = params => {
  const { email, primaryName, attending, guests, notes } = params;

  return {
    Text: `Thank you for responding! We'll miss you!`,
    Html: `<h3>Thank you for responding!</h3><p>We'll miss you!</p>`
  };
};

const attendingBody = params => {
  const { email, primaryName, attending, guests, notes } = params;

  return {
    Text: `Thank you for responding! We're excited to see you in June!`,
    Html: `<h3>Thank you for responding!</h3><p>See you in June!</p>`
  };
};

const generateEmailBody = params => {
  const { attending } = params;
  if (!attending) {
    throw new Error('"attending" param must be set');
  }

  return attending === 'no' ? notAttendingBody(params) : attendingBody(params);
};

const sendEmail = (params, callback) => {
  ses.sendEmail(
    {
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
    },
    (err, data) => {
      if (err) {
        console.error('Error while sending email via AWS SES:', err);
        return redir(callback, 'fail');
      }

      console.log('success');
      redir(callback, 'sent');
    }
  );
};

// For more info, check https://www.netlify.com/docs/functions/#javascript-lambda-functions
module.exports.handler = function(event, context, callback) {
  console.log('body', event.body);

  if (event['httpMethod'] !== 'POST') {
    return callback(
      new Error(`Unexpected HTTP method "${event['httpMethod']}"`)
    );
  }

  const params = JSON.parse(event.body);

  console.log('body', generateEmailBody(params));

  sendEmail(params, callback);
};
