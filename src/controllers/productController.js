import { Op } from "sequelize";
import { Product } from "../database/models";

class ProductController{
    static async searchProduct(req,res){
        const { searchParam } = req.query;
        try {
            const search = await Product.findAll({where:{
                [Op.or]:[
                    {productName:{[Op.iLike]:`%${searchParam}%`}},
                    {productDescription:{[Op.iLike]:`%${searchParam}%`}},
                    {productPrice:{[Op.iLike]:`%${searchParam}%`}},
                    {productOwner:{[Op.iLike]:`%${searchParam}%`}},
                ]
            }});
            return res.status(200).json({status:"success",data:search});
        } catch (error) {
            return res.status(500).json({status:"error",error:error.message});
        }
    }
}

export default ProductController;