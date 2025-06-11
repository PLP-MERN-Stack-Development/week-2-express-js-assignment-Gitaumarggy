const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 

// Create a new product
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body); // Use 'Product' here
    await product.save();
    res.status(201).send(product);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Read all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find(); // Use 'Product'
    res.send(products);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Read a specific product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Delete a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

