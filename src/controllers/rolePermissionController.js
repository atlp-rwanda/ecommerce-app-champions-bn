const { RolePermission, Role, Permission } = require("../database/models");

const addRolePermission = async (req, res) => {
  try {
    const { roleId, permissionIds } = req.body;
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ status: "error", message: "Role not found" });
    }
    const permissions = await Permission.findAll({
      where: { id: permissionIds },
    });
    if (permissionIds && permissions.length === 0) {
      return res.status(404).json({ status: "error", message: "Permissions not found" });
    }
    await role.addPermissions(permissions, { through: { roleId } });
    const updatedRole = await Role.findByPk(roleId, { include: Permission });
    return res.status(200).json({
      status: "success",
      message: "Role and permission assigned successfully",
      data: updatedRole,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Failed to assign role and permission",
      error: error.message,
    });
  }
};

const addPermissionRole = async (req, res) => {
  try {
    const { permissionId, roleIds } = req.body;
    const permission = await Permission.findByPk(permissionId);
    if (!permission) {
      return res.status(404).json({ status: "error", message: "Permission not found" });
    }
    const roles = await Role.findAll({
      where: { id: roleIds },
    });
    if (roleIds && roles.length === 0) {
      return res.status(404).json({ status: "error", message: "Roles not found" });
    }
    await permission.addRoles(roles, { through: { permissionId } });
    const updatedPermission = await Permission.findByPk(permissionId, { include: Role });
    return res.status(200).json({
      status: "success",
      message: "Permission and role assigned successfully",
      data: updatedPermission,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "Failed to assign permission and role",
      error: error.message,
    });
  }
};

// Get all permissions assigned to a role
const getRolePermissions = async (req, res) => {
    try {
      const { roleId } = req.params;
      console.log('roleId:', roleId);
      const role = await Role.findByPk(roleId);
      console.log('role:', role);
      if (!role) {
        return res.status(404).json({ status: "error", message: "Role not found" });
      }
      const permissions = await role.getPermissions();
      return res.status(200).json({
        status: "success",
        message: "Permissions assigned to role retrieved successfully",
        data: permissions,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Failed to retrieve permissions assigned to role",
        error: error.message,
      });
    }
  };
  
  // Get all roles assigned to a permission
  const getPermissionRoles = async (req, res) => {
    try {
      const { permissionId } = req.params;
      const permission = await Permission.findByPk(permissionId);
      if (!permission) {
        return res.status(404).json({ status: "error", message: "Permission not found" });
      }
      const roles = await permission.getRoles();
      return res.status(200).json({
        status: "success",
        message: "Roles assigned to permission retrieved successfully",
        data: roles,
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Failed to retrieve roles assigned to permission",
        error: error.message,
      });
    }
  };

module.exports = { addRolePermission, addPermissionRole , getPermissionRoles , getRolePermissions };





// const { Role, Permission } = require("../database/models");

// const assignPermissionToRole = async (req, res) => {
//   try {
//     const { roleId, permissionId } = req.body;
//     const role = await Role.findByPk(roleId);
//     if (!role) {
//       return res.status(404).json({ status: "error", message: "Role not found" });
//     }
//     const permission = await Permission.findByPk(permissionId);
//     if (!permission) {
//       return res.status(404).json({ status: "error", message: "Permission not found" });
//     }
//     await role.addPermission(permission);
//     return res.status(200).json({ status: "success", message: "Permission assigned to role successfully" });
//   } catch (error) {
//     return res.status(400).json({ status: "error", message: "Failed to assign permission to role", error: error.message });
//   }
// };

// module.exports = assignPermissionToRole;
