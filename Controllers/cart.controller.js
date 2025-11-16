import UserModel from "../Models/users.model.js";
import ProductModel from "../Models/products.model.js";

export const addToCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    // res.send(userId + " " + productId + " " + quantity );
    const product = await ProductModel.findById(productId);
    if (!product) {
      const error = new Error("Product Not Found");
      error.statusCode = 404;
      return next(error);
    }

    const user = await UserModel.findById(userId);
    user.cart.push({
      product: product._id,
      quantity: quantity,
    });

    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId, quantity } = req.body;
    const user = await UserModel.findById(userId);

    user.cart = user.cart.map((item) => {
      if (item.product.equals(productId)) {
        item.quantity = quantity;
      }
      return item;
    });

    await user.save();
    res.json({ success: true, cart: user.cart });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId).populate("cart.product");

    res.json({ success: true, data: user.cart });
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    const user = await UserModel.findById(userId);
    user.cart = user.cart.filter((item) => item.product._id != productId);
    await user.save();
    res.json({
      success: true,
      message: "Product removed from cart successfully!",
      cart: user.cart,
    });
  } catch (error) {
    next(error);
  }
};
