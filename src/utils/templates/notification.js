/* eslint-disable */
export const productAddNotification = (firstName,productName) =>{

    return ( `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notification</title>
      </head>
      <body>

      <table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#008080">
  <tbody><tr>
  <td style="padding-top:54px;padding-bottom:42px" align="center">
  <h2 style="color:#FFFFFF;font-size: xx-large;">E-commerce ATLP-Champions project</h2>
  </td>
  </tr>
  </tbody></table>

   <p> Dear <h2> ${firstName} </h2> We want to inform you that a product <b>${productName}</b> is added into your collection  successfully. Thank you for working  with us </p> 

  <h3>Best regards,</h3>
<h5><i>E-commerce ATLP-Champions project team</i></h5>

      </body>
    </html>
    `);
}


/* eslint-disable */
export const productDeletedNotification = (firstName,productName) =>{

    return ( `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notification</title>
      </head>
      <body>

      <table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#008080">
  <tbody><tr>
  <td style="padding-top:54px;padding-bottom:42px" align="center">
  <h2 style="color:#FFFFFF;font-size: xx-large;">E-commerce ATLP-Champions project</h2>
  </td>
  </tr>
  </tbody></table>

   <p> Dear <h2> ${firstName} </h2> We want to inform you that a product <b>${productName}</b> is deleted from your collection  successfully. Thank you for working  with us </p> 

  <h3>Best regards,</h3>
<h5><i>E-commerce ATLP-Champions project team</i></h5>

      </body>
    </html>
    `);
}



/* eslint-disable */
export const productUpdatedNotification = (firstName,productId) =>{

    return ( `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notification</title>
      </head>
      <body>

      <table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#008080">
  <tbody><tr>
  <td style="padding-top:54px;padding-bottom:42px" align="center">
  <h2 style="color:#FFFFFF;font-size: xx-large;">E-commerce ATLP-Champions project</h2>
  </td>
  </tr>
  </tbody></table>

   <p> Dear <h2> ${firstName} </h2> We want to inform you that a product with id: <b>${productId}</b> is deleted from your collection  successfully. Thank you for working  with us </p> 

  <h3>Best regards,</h3>
<h5><i>E-commerce ATLP-Champions project team</i></h5>

      </body>
    </html>
    `);
}




/* eslint-disable */
export const productSoldNotification = (firstName,productName) =>{

    return ( `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Notification</title>
      </head>
      <body>

      <table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#008080">
  <tbody><tr>
  <td style="padding-top:54px;padding-bottom:42px" align="center">
  <h2 style="color:#FFFFFF;font-size: xx-large;">E-commerce ATLP-Champions project</h2>
  </td>
  </tr>
  </tbody></table>

   <p> Dear <h2> ${firstName} </h2> We want to inform you that a product <b>${productName}</b> is sold  successfully. Thank you for working  with us </p> 

  <h3>Best regards,</h3>
<h5><i>E-commerce ATLP-Champions project team</i></h5>

      </body>
    </html>
    `);
}