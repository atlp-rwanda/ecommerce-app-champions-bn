/* eslint-disable */ 
export const expiredProductsTemplate = (firstName) =>{
    return (`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset Request</title>
      </head>
      <body>
        <h1>expired products</h1>
        <p>Hello,</p>
        Dear <strong>${firstName} </strong>,
        This email is for informing you that some of your products have been expired 
        which means they have been removed from the available products to the client. check them out.

        Regards
      </body>
    </html>
    `);
}