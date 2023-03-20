const { Permission} = require("../database/models");

class PermissionController{
  static async createPermission(req,res){
    try {
      const { permissionName } = req.body;
      const existingPermission = await Permission.findOne({where:{permissionName}});
      if(existingPermission){
        return res.status(400).json({status:"fail",message:'permission exists'});
      }
      const permission = await Permission.create({ permissionName });
      return res
        .status(201)
        .json({ status: "success", data:permission });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }

  static async deletePermission(req,res){
    try {
      const existingPermission = await Permission.findOne({where:{id:req.params.id}});
      if(!existingPermission) return res.status(404).json({status:"fail",message:'permission not exists'});
      await Permission.destroy({where:{id:req.params.id}});
      return res.status(200).json({status:"success",message:"deleted"});
    } catch (error) {
      return res.status(500).json({status:"error",error:error.message});
    }
  }
}

export default PermissionController;