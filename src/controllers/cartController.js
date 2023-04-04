import { Product, cart } from "../database/models";

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
      const Cart = await cart.findOne({ where: { buyerId: req.user.id } });
      if (!Cart) {
        const newCart = await cart.create({products: [item],buyerId: req.user.id
        });
        newCart.total = newCart.products.map((item1) => JSON.parse(item1.productTotal)).reduce((sum, next) => sum + next);
        await newCart.save();
        return res.status(201).json({status: "success",message: "product added to cart successfully"});
      }
      const itemExists = Cart.products.some(
        (cartItem) => cartItem.productId === product.productId
      );
      if (itemExists === true) {
        return res.status(409).json({ status: "fail", message: "Product already in cart" });
      }
      Cart.products.push(item);
      const subtotal = Cart.products.map((item1) => JSON.parse(item1.productTotal)).reduce((sum, next) => sum + next);
      await cart.update({ products: Cart.products, total: subtotal },{ where: { id: Cart.id } }
      );
      res.status(201).json({status: "success",message: "product added to cart successfully"
      });
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }

  static async getCartItems(req, res) {
    try {
      const Cart = await cart.findOne({ where: { buyerId: req.user.id } });
      if (!Cart) {
        res.status(401).json({ status: "fail", message: "Cart is Empty" });
      } else {
        res.status(201).json({ status:"success", Cart });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateCart(req, res) {
    try {
      const { quantity } = req.body;
      const { productId } = req.params;
      const product = await Product.findOne({where: { productId, available: true }});
      const buyerCart = await cart.findOne({ where: { buyerId: req.user.id } });
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
                const newCart = await cart.update({ products: buyerCart.products, total: newTotal },{ where: { id: buyerCart.id } });
                return res.status(201).json({status: "success",message: "cart items updated successfully", newCart});
              }
              const newCart = await cart.update({ products: buyerCart.products, total: 0 },{ where: { id: buyerCart.id } });
              return res.status(201).json({status: "success",message: "cart updated, total is now zero", newCart});
            }
            const newProductTotal = product.dataValues.productPrice * quantity;
            buyerCart.products[productIndex].quantity = quantity;
            buyerCart.products[productIndex].productTotal = newProductTotal;
            const newTotal = buyerCart.products.map((item) => JSON.parse(item.productTotal)).reduce((sum, next) => sum + next);
            const newCart = await cart.update({ products: buyerCart.products, total: newTotal },{ where: { id: buyerCart.id } }
            );
            return res.status(201).json({status: "success",message: "Cart updated successfully", newCart });
        }
        return res.status(404).json({ status: "fail", message: "product not found" });
      }
    } catch (error) {
      return res.status(500).json({ status: "fail", message: error.message });
    }
  }
  
}

export default CartController;
