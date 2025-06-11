// CRUDE OPERATIONS
const connectDB = require('./db');
const{objectId} = require('mongodb');

// Create a new product
async function addProduct(product) {
    const products = await connectDB();
    const result = await collection.insertOne(product);
   console.log(`New product added with ID: ${result.insertedId}`);
    return result.insertedId;       
}

// fetching/read
async function listproducts() {
    const products = await connectDB();
    const allproduct = await product.find().toArray();
   console.log('All Products:',allProduct);

}

// Update a product
async function updateProduct(id, updatedProduct) {
    const products = await connectDB();
    const result = await products.updateOne(
        { _id: objectId(id) },
        { $set: updatedProduct }
    );
  console.log('Product updated:', result.modifiedCount);
}
// Delete a product
async function deleteProduct(id) {
    const products = await connectDB();
    const result = await products.deleteOne({ _id: objectId(id) });
    console.log('Product deleted:', result.deletedCount);
}

module.exports = {addProduct,listproducts,updateProduct,deleteProduct};