const { Permission ,Role } = require("../database/models");

const Permissions = async (req, res) => {
  try {
    const { permissionName, description  , roleIds} = req.body;
    const permission = await Permission.create({
      permissionName,
      description,
      
    });
    if (roleIds && roleIds.length > 0) {
        const roles = await Role.findAll({
          where: { id: roleIds },
        });
  
        if (roles && roles.length > 0) {
          await permission.addRoles(roles);
        }
      }
    await permission.save();
    return res
      .status(200)
      .json({ status: "success", message: "permission created successfully" });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "failed to add a permission information",
      error: error.message
    });
  }
};

module.exports = Permissions;