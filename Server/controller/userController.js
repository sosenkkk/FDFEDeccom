const User = require("../model/User");
const Message = require("../model/Contacts");
const Product = require("../model/Product");
const Order = require("../model/Order");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { getOrSetCache, redisClient } = require("../redisProvider");

cloudinary.config({
  cloud_name: `drlqa8duh`,
  api_key: `858762281996182`,
  api_secret: `Dh5ROsG7lszeA85kUPLVwuupOkA`,
});

const getTotalCart = (cart) => {
  let totalPrice = 0,
    totalQuantity = 0;
  cart.forEach((product) => {
    totalPrice = totalPrice + product.productId.productPrice * product.quantity;
    totalQuantity = totalQuantity + product.quantity;
  });

  const total = { totalPrice: totalPrice, totalQuantity: totalQuantity };
  return total;
};

exports.accountInfo = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userInfo = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (userInfo) {
      res.status(202).json({
        message: "User data found!",
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        cart: userInfo.cart,
        profile: userInfo.profile,
        isAdmin: userInfo.isAdmin,
        isSeller: userInfo.isSeller ? userInfo.isSeller : false
      });
    } else {
      res.status(404).json({ message: "Some Error Happened, User not found" });
    }
  } catch (err) {
    console.log(err);
    next();
  }
};

exports.editInfo = async (req, res, next) => {
  let uploadedFile = null;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  const userId = req.userId;

  if (req.files) {
    uploadedFile = req.files.image;
    cloudinary.uploader.upload(
      uploadedFile.tempFilePath,
      { folder: "carbon" },
      async (err, result) => {
        if (err) {
          res.status(433).json({ message: "Some error occured. Try again" });
          console.log(err);
        } else {
          const imageUrl = result.url;
          const user = await User.findById(userId);
          user.profile = imageUrl;

          if (firstName.trim().length > 0) {
            user.firstName = firstName;
          }
          if (lastName.trim().length > 0) {
            user.lastName = lastName;
          }
          const updatedUser = await user.save();
          res.status(201).json({ message: "User Updated" });
        }
      }
    );
  } else {
    const user = await User.findById(userId);
    if (firstName.trim().length > 0) {
      user.firstName = firstName;
    }
    if (lastName.trim().length > 0) {
      user.lastName = lastName;
    }
    const updatedUser = await user.save();
    res.status(201).json({ message: "User Updated" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    
    res.status(201).json({data: products});
  }  catch (err) {
    res.status(500).json({message: "something went wrong!"});
  }
}

exports.getProducts = async (req, res, next) => {
  let currentPage = req.query.page || 1;
  const query = {};
  let sort;
  if (
    req.query.filter &&
    req.query.filter != " " &&
    req.query.filter != "all"
  ) {
    query.productModel = req.query.filter;
  }
  if (req.query.sort && req.query.sort != "") {
    sort = req.query.sort;
  }
  const limit = 8;
  console.log(query);
  getOrSetCache(`products?currentPage=${currentPage}&sort=${sort}&filter=${req.query.filter}&limit=${limit}`, 3600, async () => {
    try {
      const totalProducts = await Product.aggregate([
        {
          $match: query
        },
        {
          $group: {_id: null, count: {$sum: 1}}
        }
      ]);
      console.log(totalProducts);

      // const totalProducts = await Product.find(query).countDocuments();

      console.log(totalProducts);

      let products;
      if (sort) {
        // products = await Product.aggregate([{
        //   $match: query
        // }])
        //   .sort({ productPrice: sort })
        //   .skip((currentPage - 1) * limit)
        //   .limit(limit);

        products = await Product.find(query)
        .sort({ productPrice: sort })
        .skip((currentPage - 1) * limit)
        .limit(limit)
      } else {
        // products = await Product.aggregate([{
        //   $match: query
        // }])
        //   .skip((currentPage - 1) * limit)
        //   .limit(limit);

        products = await Product.find(query)
        .skip((currentPage - 1) * limit)
        .limit(limit)
      }

      return { products, totalProducts: totalProducts.length > 0 ? totalProducts[0].count: 0 };
      // return {products, totalProducts};
    } catch (err) {
      throw err;
    }
  })
    .then((data) => {
      res.status(201).json({
        message: "Products fetched Successfully",
        products: data.products,
        totalProducts: data.totalProducts,
      });
    })
    .catch((err) => {
      console.log(err);
    })
}


exports.getSingleProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const product = await Product.findOne({ _id: productId });
    res.status(201).json({
      message: "Product fetched Successfully",
      product: product,
    });
  } catch (err) {
    console.log(err);
    res.status(433).json({ message: "Products fecthing failed" });
  }
};

exports.getTotalProducts = async (req, res, next) => {
  const totalProductModels = await Product.distinct("productModel");
  res.status(201).json({
    message: "Successfully fetched all product models",
    totalProductModels: totalProductModels,
  });
};

exports.deleteFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    user.removeFromCart(cartId);
    res.status(201).json({ message: "Item deleted from cart!" });
  } catch (error) {
    console.log(error);
    res.status(433).json({ message: "Unable to update cart" });
  }
};

exports.deleteCart = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });
    user.clearCart();
    res.status(201).json({ message: "Cart Deleted!" });
  } catch (error) {
    console.log(error);
    res.status(433).json({ message: "Unable to delete cart!" });
  }
};
exports.contactUs = async (req, res, next) => {
  try {
    const message = req.body.message;
    const userId = req.userId;
    const newMessage = await new Message({
      message: message,
      user: userId,
    });
    const messageSave = await newMessage.save();
    res.status(201).json({ message: "Message sent successfully." });
  } catch (err) {
    console.log(err);
    res.status(433).json({ message: "Message not sent due to some error." });
  }
};

exports.postCart = async (req, res, next) => {
  const quantity = req.body.quantity || 1;
  try {
    const prodId = req.body.productId;
    const userId = req.userId;
    const product = await Product.findById(prodId);
    const user = await User.findOne({ _id: userId });
    const updateduser = await user.addToCart(product, quantity);
    const updatedUserCart = await updateduser.populate("cart.productId");
    const updatedCart = updatedUserCart.cart;
    const total = getTotalCart(updatedCart);
    res
      .status(201)
      .json({ message: "Added to cart", cart: updatedCart, total: total });
  } catch (err) {
    console.log(err);
    res.status(433).json({ message: "Item not added to cart" });
  }
};

exports.getCart = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findOne({ _id: userId }).populate("cart.productId");
  const products = user.cart;
  const total = getTotalCart(products);
  res.status(201).json({ products: products, total: total });
};

exports.postCheckOut = async (req, res, next) => {
  try {
    const products = req.body.products;
    let extProducts = [];
    products.forEach((p) => {
      const productInfo = p.productId;
      const productQuantity = p.quantity;
      const prod = {
        product: productInfo,
        quantity: productQuantity,
      };
      extProducts.push(prod);
    });
    const total = req.body.total;
    const userId = req.userId;
    const user = {
      userId: userId,
      name: req.body.user.name,
      shippingAddress: req.body.user.shippingAddress,
      landmark: req.body.user.landmark,
      state: req.body.user.state,
      city: req.body.user.city,
      pincode: req.body.user.pincode,
      phoneNumber: req.body.user.phoneNumber,
    };
    const order = new Order({
      products: extProducts,
      total: total,
      user: user,
    });
    // also have to reduce quantity from the product document
    const postOrder = await order.save();
    const userCart = await User.findOne({ _id: userId });
    await userCart.clearCart();
    res.status(201).json({ message: "Order successful." });
  } catch (error) {
    console.log(error);
    res.status(433).json({ message: "Order unsuccessful." });
  }
};

exports.getOrders = async (req, res, next) => {
  const userId = req.userId;
  getOrSetCache(`orders?userId=${userId}`, 30, async () => {
    try {
      const orders = await Order.find({ "user.userId": userId });
      const updatedOrders = orders.map((order) => {
        return {
          user: order.user,
          total: order.total,
          orderPlaced: order.createdAt.toLocaleDateString(),
          id: order._id.toString(),
        };
      });
      return updatedOrders;
    } catch (error) {
      console.log(error)
      throw new Error("some error occured");
    }
  })
    .then((data) => {
      res.status(201).json({
        message: "Fetched Orders Successfully.",
        orders: data,
      });
    })
    .catch((err) => {
      console.log(err);
    })
};

exports.getSingleOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const order = await Order.findById(orderId).populate("user.userId");
  console.log(order);
  res
    .status(201)
    .json({ message: "Order fetched successfully.", order: order });
};
