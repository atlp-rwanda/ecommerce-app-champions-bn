/* istanbul ignore file */
import { Op } from "sequelize";

const { ReportedActivity,Vendor} = require("../database/models");

class ReportedActivityController{
    static async reportIllegalActivity(req,res){
        try {
            const existingProductReport = await ReportedActivity.findOne({where:{[Op.and]:[{productId:req.body.productId},{buyerId:req.body.buyerId}]
        }});
            if(existingProductReport){
                return res.status(403).json({status:"fail",message:"your reports exists"});
            }
            const reportactivity = await ReportedActivity.create({
                activity:req.body.activity,
                category:req.body.category,
                productId:req.body.productId,
                buyerId:req.body.buyerId,
                VendorId:req.body.VendorId
            });
            return res.status(201).json({status:"success",data:reportactivity});
        } catch (error) {
            return res.status(500).json({status:"success",error:error.message});
        }
    }

    static async reportedActivities(req,res){
        try {
            const reports = await ReportedActivity.findAll({include:[Vendor]});
            return res.status(200).json({status:"success",data:reports});
        } catch (error) {
            return res.status(500).json({status:"success",error:error.message});
        }
    }

}

export default ReportedActivityController;