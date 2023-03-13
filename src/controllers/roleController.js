const { Permission ,Role } = require("../database/models");

class RoleController{
  static async createRole(req,res){
    try {
      const { roleName, description , permissionIds} = req.body;
      const role = await Role.create({
        roleName,
        description });
      if (permissionIds && permissionIds.length > 0) {
          const permissions = await Permission.findAll({
            where: { id: permissionIds },
          });
    
          if (permissions && permissions.length > 0) {
            await role.addPermissions(permissions);
          }
        }
      await role.save();
      return res
        .status(200)
        .json({ status: "success", message: "role created successfully" });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "failed to add a role information",
        error: error.message
      });
    }
  }

  static async getRoles(req,res){
    try {
      const roles = await Role.findAll();
      return res.status({status:"success",data:roles});
    } catch (error) {
      return res.status(500).json({status:"error",error:error.message});
    }
  }
}

export default RoleController;

