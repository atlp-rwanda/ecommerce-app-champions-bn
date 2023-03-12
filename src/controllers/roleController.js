import models from "../database/models";

const { User,Role } = models;

class RoleController{
    static async createRole(req,res){
        try {
            const {roleName,description} = req.body;
            const role = await Role.create({roleName,description});
            return res.status(201).json({status:"success",data:role});
        } catch (error) {
            return res.status(500).json({status:"error",error:error.message});
        }
    }

    static async getAll(req,res){
        try {
            const roles = await Role.findAll();
            return res.status(200).json({status:"success",data:roles});
        } catch (error) {
            return res.status(500).json({status:"error",error:error.message});
        }
    }

    static async getOne(req,res){
        try {
            const role = await Role.findOne({where:{id:req.params.id}});
            return res.status(200).json({status:"success",data:role});
        } catch (error) {
            return res.status(500).json({status:"error",error:error.message});
        }
    }
}

export default RoleController;