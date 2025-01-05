import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import './ProductManagement.css';

const ProductManagement = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts(); // Get products and functions from context
  const [editingProduct, setEditingProduct] = useState(null);

  // Handle adding a new product
  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),  // Unique ID for new product
      name: '',
      price: 0,
      description: '',
      category: 'Men',  // Default category
    };
    addProduct(newProduct);  // Add the product to the state
    setEditingProduct(newProduct);  // Immediately edit the new product
  };

  // Handle updating an existing product
  const handleUpdateProduct = (id, updatedProduct) => {
    updatedProduct.price = parseFloat(updatedProduct.price) || 0; // Ensure price is a number
    updateProduct(updatedProduct); // Replace old product data with updated one
    setEditingProduct(null); // Stop editing
  };

  // Handle deleting a product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);  // Remove the product from the list
    }
  };

  return (
    <div className="product-management">
      <h2>Product Management</h2>
      <button className="add-product-btn" onClick={handleAddProduct}>
        Add Product
      </button>
      <div className="product-list">
        {products.map((product) =>
          editingProduct?.id === product.id ? (
            <ProductForm
              key={product.id}
              product={product}
              onSave={(updatedProduct) =>
                handleUpdateProduct(product.id, updatedProduct)
              }
              onCancel={() => setEditingProduct(null)}
            />
          ) : (
            <div key={product.id} className="product-item">
              <h3>{product.name || 'New Product'}</h3>
              <p>{product.description}</p>
              <p>
                Price: ${isNaN(product.price) ? 'N/A' : product.price.toFixed(2)}
              </p>
              <p>Category: {product.category}</p>
              <button
                className="edit-btn"
                onClick={() => setEditingProduct(product)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const ProductForm = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price') {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 }); // Ensure price is a number
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      alert('Name, Price, and Category are required.');
      return;
    }
    onSave(formData); // Trigger onSave with updated product data
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </label>
      <label>
        Category:
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ProductManagement;



