/* eslint-disable */
export const disableVendorAccount = (report) =>{
    return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset Request</title>
      </head>
      <body>
        <h1>deactivating your account</h1>
        <p>Hello,</p>
        <p>
          You are receiving this email because , your account have been disabled due to the reports reported by the buyers such as 
          <strong>${report}</strong>
          
          reach out to us for further details.
        </p>
      </body>
    </html>
    `);
}