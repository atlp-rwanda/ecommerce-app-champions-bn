import { Router } from "express";
// import assignPermissionToRole from "../../controllers/rolePermissionController";
import { addRolePermission } from "../../controllers/rolePermissionController";
import { addPermissionRole } from "../../controllers/rolePermissionController";
import { getPermissionRoles  } from "../../controllers/rolePermissionController";
import { getRolePermissions } from "../../controllers/rolePermissionController";


const rolePermission = Router();

rolePermission.post("/rolePermission", addRolePermission);
rolePermission.post("/permissionRole", addPermissionRole);
rolePermission.get("/permissions", getRolePermissions);
rolePermission.get("/roles", getPermissionRoles);



export default rolePermission;
