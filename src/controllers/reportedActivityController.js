const { ReportedActivity} = require("../database/models");

class ReportedActivityController{
    static async reportIllegalActivity(req,res){
        try {
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
            const reports = await ReportedActivity.findAll();
            return res.status(200).json({status:"success",data:reports});
        } catch (error) {
            return res.status(500).json({status:"success",error:error.message});
        }
    }

}

export default ReportedActivityController;