import { Router } from "express";
import RoleController from "../controllers/roleController";
import { verifyAdmin } from "../middlewares/authenticate";


const roleRoute = Router();

roleRoute.post("/create", verifyAdmin,RoleController.createRole);
roleRoute.delete("/delete/:id", verifyAdmin,RoleController.deleteRole);


export default roleRoute;
