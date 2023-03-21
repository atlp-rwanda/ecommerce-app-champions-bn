import { Router } from "express";
import RoleController from "../controllers/roleController";


const roleRoute = Router();

roleRoute.post("/create", RoleController.createRole);
roleRoute.delete("/delete/:id", RoleController.deleteRole);


export default roleRoute;
