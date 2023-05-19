import { Router } from "express";
import PermissionController from "../controllers/permissionController";
import { verifyAdmin } from "../middlewares/authenticate";


const permissionRoute = Router();

permissionRoute.get("/vendor-permissions", verifyAdmin, PermissionController.getVendorPermissions);
permissionRoute.patch("/enable-or-disable-permission/:id", PermissionController.enableOrDisableUserPermission);
permissionRoute.post("/create", verifyAdmin , PermissionController.createPermission);
permissionRoute.delete("/delete/:id",verifyAdmin,PermissionController.deletePermission);

export default permissionRoute;