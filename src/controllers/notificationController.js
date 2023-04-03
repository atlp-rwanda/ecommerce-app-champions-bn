
import socketIOClient from "socket.io-client";
import nodemailer from "nodemailer";
import crown from "node-cron";

import Product from  "../database/models/product";
import User from "../database/models/user";
import Vendor from "../database/models/vendor";

import { Notification } from "../database/models";

const sendEmail = async(receiver)=>{

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


  const options = {

    from:process.env.EMAIL,
    to:receiver.email,
    subject:receiver.subject,
    html:receiver.html,
    secure:true,
  };

  
transporter.sendMail(options,async(error,info)=>{
  if (error) {
    console.log(error);
} else {
    console.log(`Email sent:${info.response}`);
}
});

};


  const templateHeader = `<table style="border-collapse:collapse;border-spacing:0;width:100%;min-width:100%" width="100%" height="auto" cellspacing="0" cellpadding="0" bgcolor="#008080">
  <tbody><tr>
  <td style="padding-top:54px;padding-bottom:42px" align="center">
  <h2 style="color:#FFFFFF;font-size: xx-large;">E-commerce ATLP-Champions project</h2>
  </td>
  </tr>
  </tbody></table>`;

  const templateFotter = `<h3>Best regards,</h3>
<h5><i>E-commerce ATLP-Champions project team</i></h5>`;

const emitProductAdded = async(productName,vendor)=>{

const socket = socketIOClient("http://localhost:5000");

const notification = await Notification.create({
subject:"New product addedd",
message:`Hello ${vendor.firstName}, a product ${productName} is added into your collection successfuly`,
type:"newProduct",
userId:vendor.id

});



const sendEmaiOption = {
  email:vendor.email,
  subject:notification.subject,
  html: `${templateHeader} <p> Dear <h2> ${vendor.firstName} </h2> We want to inform you that a product <b>${productName}</b> is added into your collection  successfully, thank you for working  with us </p> ${templateFotter}`,
};

await sendEmail(sendEmaiOption);

socket.emit("notification", {
  message: notification.message,
  userId: vendor.id
});


};

const emitProductDeleted=async()=>{

};


export {emitProductAdded,emitProductDeleted};




