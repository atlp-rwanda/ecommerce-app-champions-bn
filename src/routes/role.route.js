import { Router } from "express";
import RoleController from "../controllers/roleController";
import { verifyAdmin } from "../middlewares/authenticate";


const roleRoute = Router();

roleRoute.get("/all", verifyAdmin,RoleController.getAllRoles);
roleRoute.patch("/assign-role/:id", verifyAdmin,RoleController.assignRole);
roleRoute.post("/create", verifyAdmin,RoleController.createRole);
roleRoute.delete("/delete/:id", verifyAdmin,RoleController.deleteRole);


export default roleRoute;
