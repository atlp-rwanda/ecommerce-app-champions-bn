import { Router } from "express";
import Roles from "../../controllers/roleController";


const roleRoute = Router();

roleRoute.post("/role", Roles);

export default roleRoute;
