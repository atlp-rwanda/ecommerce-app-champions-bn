/*eslint-disable*/ 
export const resetPasswordEmail = () =>{
  return  `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Reset Request</title>
    </head>
    <body>
      <h1>Password Reset Request</h1>
      <p>Hello,</p>
      <p>
        You are receiving this email because a request was made to reset the password for your account. If you did not make
        this request, please ignore this email.
      </p>
      <p>
        To reset your password, please click on the following link or copy and paste it into your browser:
        <a href="${[Inserthere]}">Reset Password</a>
      </p>
      <p>
        If the link does not work, please copy and paste the following token into the reset password form:
        <strong>[Insert reset token here]</strong>
      </p>
      <p>This link and token will expire in 24 hours. If you do not reset your password within that time, you will need to request another reset.</p>
      <p>If you have any questions or concerns, please reply to this email and we will be happy to help.</p>
      <p>Thank you,<br />[Your company name]</p>
    </body>
  </html>
  `;
};