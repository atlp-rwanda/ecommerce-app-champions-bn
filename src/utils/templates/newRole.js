/* eslint-disable */
export const newRole = (firstName,newRole) =>{
    return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset Request</title>
      </head>
      <body>
        <h1>changed your role on the platform</h1>
        <p>Dear, ${firstName}</p>
        <p>
          You are receiving this email because , your account role have been changed to  
          <strong>${newRole}</strong>
          
          reach out to us for further details.
        </p>
      </body>
    </html>
    `);
}