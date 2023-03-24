import { Op, where } from "sequelize";
import { Product, sequelize,Category,user } from "../database/models";


class ProductController{
    static async searchProduct(req,res){
        const { searchParam } = req.query;
        try {
            const search = await Product.findAll({ where:{
                [Op.or]:[
                    {productName:{
                        [Op.like]:`%${searchParam}%`
                    }},
                    {productDescription:{
                        [Op.like]:`%${searchParam}%`
                    }},
                    {productOwner:{
                        [Op.like]:`%${searchParam}%`
                    }},
                ]
            }});
           

            return res.status(200).json({status:"success",data:search});
        } catch (error) {
            return res.status(500).json({status:"error",error:error.message});
        }
    };




  static async createProduct(req, res) {
    try {
      const {
        productName,
        productPrice,
        quantity,
        productDescription,
        productOwner,
        CategoryId,
        expiredDate
      } = req.body;
      const productImage = req.files.map((img) => img.path);
      const product = await Product.create({
        vendorId: req.user.role.id,
        productName,
        productPrice,
        quantity,
        productDescription,
        productOwner,
        expiredDate,
        CategoryId,
        productImage
      });

      await product.save();
      return res
        .status(200)
        .json({
          status: "success",
          message: "product created",
          product: { product }
        });
    } catch (error) {
      return res.json({ error: error.message });
    }
  }

  static async categoryController(req, res) {
    const { name } = req.body;
    try {
      const category = await Category.create({
        name
      });

      await category.save();

      return res.status(200).json({ message: "category created" });
    } catch (error) {
      return error.message;
    }
  };



  static async getAllProducts(req, res) {
    try{
     
console.log(req.user);

const product=await Product.findAll({where:{vendorId:req.user.id}});
  // const product=await Product.findAll({where:{email:req.user.email},include:{model:user,attributes:["firstName","lastName","email"]}});

    return res.status(200).json({status:"success",message:product});


    }catch(err){
     return res.status(500).json({status:"error", message:err.message});
    };


   };


   static async getAvailableProduct(req,res){
    try{
    const product=await Product.findAll();
    const {available} = product[0].dataValues.available;

    if(available===false){
    
    return res.status(500).json({status:"error",message:[]});
     
    }
    
    return res.status(200).json({status:"success",message:product});
    
    
    }catch(err){
      return res.status(500).json({status:"error", message:err.message});
    }
   }
}


export default ProductController;




