// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const { v4: uuidv4 } = require('uuid');


// Connect to MongoDB
const MONGO_URI = 'mongodb://localhost:27017/productdb';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(express.json());

// Middleware setup
// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});
// Authentication middleware (dummy example)
app.use((req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== '123456') {
    return res.status(401).json({ message: 'Unauthorized. Invalid API key.' });
  }
  next();
});
// validation middleware
app.use((req, res, next) => {
  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category) {
    return res.status(400).json({ message: 'Bad Request. Missing required fields.' });
  }
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});


// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API');
});
// GET /api/products - supports filtering, pagination, and search
app.get('/api/products', (req, res) => {
  const { category, search, page = 1, limit = 5 } = req.query;

  let filteredProducts = [...products];

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedResults = filteredProducts.slice(startIndex, endIndex);

  res.json({
    total: filteredProducts.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedResults
  });
});

// GET /api/products/stats - Product count by category
app.get('/api/products/stats', (req, res) => {
  const stats = {};

  products.forEach(product => {
    const cat = product.category;
    stats[cat] = stats[cat] ? stats[cat] + 1 : 1;
  });

  res.json({ totalCategories: Object.keys(stats).length, countByCategory: stats });
});




// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});
// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
  const product = {
    id: uuidv4(),
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  };
  products.push(product);
  res.status(201).json(product);
});

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Product not found' });
  
  products[index] = { ...products[index], ...req.body };
  products[index] = updatedProduct;
  res.json(updatedProduct);
});

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
});

// TODO: Implement custom middleware for:
// - Request logging
// - Authentication
// - Error handling



// Start the server
mongoose.connect('mongodb://localhost:27017/productdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
})

// Export the app for testing purposes
module.exports = app; 