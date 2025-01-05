import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data'; // or import products data if needed
import './ProductDetails.css'; 

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productFound = products.find((prod) => prod.id === parseInt(id));
    setProduct(productFound);
  }, [id]);

  // Add product to cart
  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = existingCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
      existingProduct = { ...product, quantity: 1 }; // Add new product with quantity
      existingCart.push(existingProduct);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Product added to cart!');
  };

  return (
    <div className="product-details">
      {product ? (
        <>
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <button onClick={addToCart}>Add to Cart</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetails;
