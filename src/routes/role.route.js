import express from "express";
import RoleController from "../controllers/roleController";

const roleRoute = express.Router();

roleRoute.post("/add/:id",RoleController.addPermission);

export default roleRoute;