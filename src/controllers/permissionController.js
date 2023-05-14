/* istanbul ignore file */
const { Permission, Role, RolePermission } = require("../database/models");

class PermissionController {
  static async getVendorPermissions(req, res) {
    try {
      const vendorPermissions = await RolePermission.findAll({
        where: { RoleId: 2 }
      });
      return res
        .status(200)
        .json({ status: "success", data: vendorPermissions });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  static async createPermission(req, res) {
    try {
      const { permissionName, permissionFor } = req.body;
      const existingPermission = await Permission.findOne({
        where: { permissionName }
      });
      if (existingPermission) {
        return res
          .status(400)
          .json({ status: "fail", message: "permission exists" });
      }
      const permission = await Permission.create({ permissionName });
      const role = await Role.findOne({ where: { roleName: permissionFor } });
      role.addPermission(permission);
      return res.status(201).json({ status: "success", data: permission });
    } catch (error) {
      return res.status(500).json({
        status: "fail",
        error: error.message
      });
    }
  }

  static async enableOrDisableUserPermission(req, res) {
    try {
      const updatedPermission = await Permission.update(
        { permissionStatus: req.body.permissionStatus },
        { where: { id: req.params.id } }
      );
      return res.status(200).json({
        status: "success",
        data: updatedPermission,
        message: "permission updated."
      });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }

  static async deletePermission(req, res) {
    try {
      const existingPermission = await Permission.findOne({
        where: { id: req.params.id }
      });
      if (!existingPermission)
        return res
          .status(404)
          .json({ status: "fail", message: "permission not exists" });
      const { permissionName } = existingPermission.dataValues;
      const role = await Role.findOne({ where: { roleName: permissionName.split(' ')[0] } });
      role.removePermission(existingPermission);
      await Permission.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ status: "success", message: "deleted" });
    } catch (error) {
      return res.status(500).json({ status: "fail", error: error.message });
    }
  }
}

export default PermissionController;
