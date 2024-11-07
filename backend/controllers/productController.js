const Product = require("../models/productModel");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  const user_id = req.user._id;
  const accountType = req.user.accountType;
  let products;

  if (accountType === "Merchant") {
    products = await Product.find({ user_id }).sort({ createdAt: -1 });
  } else {
    // For Consumers, show all products and populate the merchant's email
    products = await Product.find({}).populate('user_id', 'email');
  }

  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { title, price, quantity } = req.body;
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!quantity) {
    emptyFields.push("quantity");
  }
  if (!price) {
    emptyFields.push("price");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const product = await Product.create({ title, price, quantity, user_id });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  const product = await Product.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

const updateProductQuantity = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such product" });
  }
  const product = await Product.findOneAndUpdate(
    { _id: id },
    { $set: { quantity } },
    { new: true }
  );
  if (!product) {
    return res.status(404).json({ error: "No such product" });
  }
  res.status(200).json(product);
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductQuantity
};
