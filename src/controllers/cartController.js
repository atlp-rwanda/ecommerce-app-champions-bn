/* eslint-disable radix */
/* istanbul ignore file */
import { Product, Cart } from "../database/models";

class CartController {
  static async addItem(req, res) {
    try {
      const { productId } = req.params;
      const product = await Product.findOne({where: { productId, available: true }});
      if (!product) {
        return res.status(404).json({ status: "not Found", message: "Product not found" });
      }
      const item = {
        productId: product.productId,
        productName: product.productName,
        productImage: product.productImage[0],
        quantity: 1,
        productPrice: product.productPrice,
        productTotal: product.productPrice
      };
      const cart = await Cart.findOne({ where: { BuyerId: req.user.id } });
      if(cart){
        const itemExists = cart.products.some(
          (cartItem) => cartItem.productId === product.productId
        );
        if (itemExists === true) {
          return res.status(409).json({ status: "fail", message: "Product already in cart" });
        }
        cart.products.push(item);
        const subtotal = cart.products.map((item1) => JSON.parse(item1.productTotal)).reduce((sum, next) => sum + next);
        await Cart.update({ products: cart.products, total: subtotal },{ where: { id: cart.id } }
        );
        return res.status(201).json({status: "success",message: "product added to cart successfully"
        });
      }
      
        const newCart = await Cart.create({products: [item],BuyerId: req.user.id
        });
        newCart.total = newCart.products.map((item1) => JSON.parse(item1.productTotal)).reduce((sum, next) => sum + next);
        await newCart.save();
        return res.status(201).json({status: "success",message: "product added to cart successfully"});      
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  static async getCartItems(req, res) {
    try {
      const cart = await Cart.findOne({ where: { BuyerId: req.user.id } });
      if (!cart) {
        res.status(401).json({ status: "fail", message: "Cart is Empty" });
      } else {
        res.status(201).json({ status:"success", message:"cart items", data: cart });
      }
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(422).json({ status: "DatabaseError", message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }

  static async updateCart(req, res) {
    try {
      const { quantity } = req.body;
      const { productId } = req.params;
      const product = await Product.findOne({where: { productId, available: true }});
      const buyerCart = await Cart.findOne({ where: { BuyerId: req.user.id } });
      if (buyerCart) {
        const productIndex = buyerCart.products.findIndex(
          // eslint-disable-next-line eqeqeq
          (cartitem) => cartitem.productId == productId
        );
        if (productIndex !== -1) {
          if (product.dataValues.quantity < quantity) {
            return res.status(404).json({ status: "fail", message: "quantity exceeds stock" });
          } 
            if (quantity <= 0) {
              buyerCart.products.splice(productIndex, 1);
              if (buyerCart.products.length !== 0) {
                const newTotal = buyerCart.products.map((item) => JSON.parse(item.productTotal)).reduce((sum, next) => sum + next);
                const newCart = await Cart.update({ products: buyerCart.products, total: newTotal },{ where: { id: buyerCart.id } });
                return res.status(201).json({status: "success",message: "cart items updated successfully", newCart});
              }
              const newCart = await Cart.update({ products: buyerCart.products, total: 0 },{ where: { id: buyerCart.id } });
              return res.status(201).json({status: "success",message: "cart updated, total is now zero", newCart});
            }
            const newProductTotal = product.dataValues.productPrice * quantity;
            buyerCart.products[productIndex].quantity = quantity;
            buyerCart.products[productIndex].productTotal = newProductTotal;
            const newTotal = buyerCart.products.map((item) => JSON.parse(item.productTotal)).reduce((sum, next) => sum + next);
            const newCart = await Cart.update({ products: buyerCart.products, total: newTotal },{ where: { id: buyerCart.id } }
            );
            return res.status(201).json({status: "success",message: "Cart updated successfully", newCart });
        }
        return res.status(404).json({ status: "fail", message: "product not found" });
      }
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  static async clearCart(req, res) {
    try {
      const cart = await Cart.findOne({ where: { BuyerId: req.user.id} });
      if (!cart) {
        return res.status(404).json({ status:"fail", message:req.t("Cart not found") });
      }
      if ((cart.products).length===0){
        return res.status(404).json({ status:"fail", message:req.t("Cart is empty") });
      }

      await cart.update({ products: [], total: 0 });
      return res.status(200).json({ status: "success", message: req.t("CartCleared") });
    
    } catch (error) {
      res.status(500).json({ status:"error", message: error.message});
    }
  }

  static async deleteCartItem(req, res) {
    try {
      const  productId  = parseInt( req.params.id);
      const cart = await Cart.findOne({ where: { BuyerId: req.user.id } });

      if (!cart) {
        return res.status(404).json({ status: "fail",message:req.t("Cart not found")});
      }

    
      const productIndex = cart.products.findIndex((cartItem) => cartItem.productId ===  productId);

      if (productIndex === -1) {
        return res.status(404).json({ status: "fail",message: req.t("productnotfound") });
      }
      const updatedProducts = [...cart.products.slice(0, productIndex), ...cart.products.slice(productIndex + 1)];
      const newTotal =await updatedProducts.reduce((sum, item) => sum + item.productTotal, 0);
      await cart.update({products:updatedProducts, total: newTotal });


      return res.status(200).json({ status: "success",message: req.t("CartCleared") });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }
  
}

export default CartController;
