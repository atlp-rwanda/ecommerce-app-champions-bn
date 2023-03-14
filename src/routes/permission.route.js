import { Router } from "express";
import PermissionController from "../controllers/permissionController";


const permissionRoute = Router();

permissionRoute.post("/create", PermissionController.createPermission);
permissionRoute.delete("/delete/:id",PermissionController.deletePermission);

export default permissionRoute;