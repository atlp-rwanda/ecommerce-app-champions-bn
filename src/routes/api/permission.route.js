import { Router } from "express";
import Permissions from "../../controllers/permissionController";


const permissionRoute = Router();

permissionRoute.post("/permission", Permissions);

export default permissionRoute;