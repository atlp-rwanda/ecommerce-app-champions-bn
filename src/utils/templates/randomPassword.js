/*eslint-disable*/ 
export const randomPasswordEmail = (firstName,authNum) =>{
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to Our Website</title>
      <style>
        /* Reset styles */
        body,
        body * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
  
        /* Base styles */
        body {
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.5;
          color: #333;
        }
  
        h1 {
          font-size: 24px;
          margin-bottom: 16px;
        }
  
        p {
          margin-bottom: 16px;
        }
  
        a {
          color: #007bff;
          text-decoration: none;
        }
  
        /* Container styles */
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 32px;
          background-color: #f7f7f7;
        }
  
        /* Button styles */
        .button {
          display: inline-block;
          padding: 8px 16px;
          background-color: #007bff;
          color: #fff;
          border-radius: 4px;
          text-decoration: none;
        }
  
        /* Responsive styles */
        @media screen and (max-width: 480px) {
          .container {
            padding: 16px;
          }
  
          h1 {
            font-size: 20px;
            margin-bottom: 8px;
          }
  
          p {
            margin-bottom: 8px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Our Website!, ${firstName }</h1>
        <p>Thank you for creating an account. Your password is:</p>
        <p><strong>${authNum}</strong></p>
        <p>Please use this password to login to your account.</p>
        <p>
          If you have any questions or concerns, please don't hesitate to
          <a href="#">contact us</a>.
        </p>
      </div>
    </body>
  </html>
  `;
}
