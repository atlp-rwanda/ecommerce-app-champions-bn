/* istanbul ignore file */
import socketIOClient from "socket.io-client";
import nodemailer from "nodemailer";
import crown from "node-cron";
import dotenv from "dotenv";

import {Vendor,Notification,User,Product} from "../database/models";

import sendEmail from "../utils/sendEmail";


dotenv.config();


const emitProductAdded = async(productName,vendor)=>{

const socket = socketIOClient(`${process.env.APP_URL}`);

const notification = await Notification.create({
subject:"New product added",
message:`Hello ${vendor.firstName}, a product ${productName} is added into your collection successfuly`,
type:"newProduct",
userId:vendor.id

});


sendEmail({email:vendor.email,firstName:vendor.firstName,productName},"productAddedNotification");

socket.emit("notification", {
  message: notification.message,
  userId: vendor.id
});

};

const emitProductDeleted=async(productName,vendor)=>{
  const socket = socketIOClient(`${process.env.APP_URL}`);

const notification = await Notification.create({
  subject:"product deleted",
  message:`Hello ${vendor.firstName}, a product ${productName} is deleted successfuly`,
  type:"productDeleted",
  userId:vendor.id
  
  });

  sendEmail({email:vendor.email,firstName:vendor.firstName,productName},"productDeletedNotification");

socket.emit("notification", {
  message: notification.message,
  userId: vendor.id
});


};

const emitProductUpdated = async (productId,vendor) =>{

  const socket = socketIOClient(`${process.env.APP_URL}`);

  const notification = await Notification.create({
    subject:"product updated",
    message:`Hello ${vendor.firstName}, a product with id: ${productId} is updated successfuly`,
    type:"productUpdate",
    userId:vendor.id
    
    });

    socket.emit("notification", {
      message: notification.message,
      userId: vendor.id
    });

    sendEmail({email:vendor.email,firstName:vendor.firstName,productId},"productUpdatedNotification");
   
 };

 const emitProductSold=async(productName,vendor)=>{
  const socket = socketIOClient(`${process.env.APP_URL}`);

  const notification = await Notification.create({
    subject:"product sold",
    message:`Hello ${vendor.firstName}, a product ${productName} is sold from your collection`,
    type:"productSold",
    userId:vendor.id
    
    });

    sendEmail({email:vendor.email,firstName:vendor.firstName,productName},"productSoldNotification");
    socket.emit("notification", {
      message: notification.message,
      userId: vendor.id
    });

 };

 const getNotifications=async(req,res)=>{

  try{
   
    const existingVendor = await Vendor.findOne({where:{UserId:req.user.id}});

    const notifications=await Notification.findAll({where: {userId:existingVendor.dataValues.UserId}});

    if(!notifications){
      res.status(404).json({status:"error",message:"Notifications not found"});
    }
    res.status(200).json({status:"success",message:notifications});
  }catch(error){
    return res.status(500).json({status:"error",message:error.message});
  }

 };

 const deleteNotifications=async(req,res)=>{

  try{
  
    const notification=await Notification.findOne({where: {id:req.params.id}});


    if(!notification){
      res.status(404).json({status:"error",message:"Notification not found"});
    }

    await Notification.destroy({where:{id:req.params.id}});

    res.status(200).json({status:"success",message:[]});
  }catch(error){
    return res.status(500).json({status:"error",message:error.message});
  }

 };

export {emitProductAdded,emitProductDeleted,emitProductUpdated,emitProductSold,getNotifications,deleteNotifications};