const express = require('express');
const multer = require('multer');
const Product = require('../models/productModel');
const router = express.Router();

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Filename for the uploaded file
  }
});

const upload = multer({ storage });

// Upload image route
router.post('/upload/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { image: req.file.path }, // Save the image path
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'No such product' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
