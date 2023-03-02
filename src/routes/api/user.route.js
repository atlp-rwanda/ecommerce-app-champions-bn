import { Router } from "express";
import Users from "../../controllers/userController";


const route = Router();

route.post("/signup", Users);

export default route;
