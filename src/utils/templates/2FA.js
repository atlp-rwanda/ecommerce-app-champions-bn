/*eslint-disable*/ 
export const twoFactorEmail = (firstName,OTP) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Two-Factor Authentication Verification</title>
      <style type="text/css">
        body {
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #333333;
          padding: 0;
          margin: 0;
        }
        h1 {
          font-size: 28px;
          font-weight: bold;
          margin: 0 0 30px;
          color: #333333;
          line-height: 1.2;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 30px;
          background-color: #f2f2f2;
          border-radius: 10px;
        }
        .btn {
          display: inline-block;
          background-color: #008cba;
          color: #ffffff;
          font-size: 16px;
          font-weight: bold;
          padding: 14px 25px;
          border-radius: 4px;
          text-decoration: none;
          text-align: center;
          margin-top: 20px;
        }
        .btn:hover {
          background-color: #005f73;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Two-Factor Authentication Verification</h1>
        <p>Dear ${firstName },</p>
        <p>
          As part of our ongoing efforts to ensure the security of your account,
          we are implementing two-factor authentication. To complete this process,
          please use the following verification code:
        </p>
        <p
          style="
            font-size: 24px;
            font-weight: bold;
            margin-top: 30px;
            margin-bottom: 30px;
          "
        >
          <strong>${OTP }</strong>
        </p>
          Please note that this code will expire in 5 minutes for security
          purposes. If you do not complete the verification process within this
          timeframe, you will need to generate a new code.
        </p>
        <p>
          If you did not initiate this process, please contact our support team
          immediately at so we can investigate and secure your account.
        </p>
        <p>Thank you for your cooperation in keeping your account safe.</p>
        <p>Best regards,</p>
      </div>
    </body>
  </html>
  `;
};