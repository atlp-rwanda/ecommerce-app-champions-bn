/* istanbul ignore file */
const { Role } = require("../database/models");

class RoleController {
  static async createRole(req, res) {
    try {
      const { roleName } = req.body;
      const existingRole = await Role.findOne({ where: { roleName } });
      if (existingRole) {
        return res
          .status(400)
          .json({ status: req.t("fail"), message: req.t("roles") });
      }
      const role = await Role.create({ roleName });
      return res.status(201).json({ status: req.t("success"), data: role });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        error: error.message
      });
    }
  }

  static async deleteRole(req, res) {
    try {
      const existingRole = await Role.findOne({ where: { id: req.params.id } });
      if (!existingRole)
        return res
          .status(404)
          .json({ status: "fail", message: "roles not found" });
      await Role.destroy({ where: { id: req.params.id } });
      return res.status(200).json({ status: "success", message: "deleted" });
    } catch (error) {
      return res.status(500).json({ status: "error", error: error.message });
    }
  }
}

export default RoleController;
