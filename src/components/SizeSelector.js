import React, { useState } from 'react';

function SizeSelector({ product, setShowBottomSheet }) {
  const [selectedSize, setSelectedSize] = useState(null);

  const sizes = product.sizes; // Assuming `sizes` is an array of available sizes

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size!');
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingProduct = existingCart.find((item) => item.id === product.id && item.size === selectedSize);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingProduct = { ...product, quantity: 1, size: selectedSize };
      existingCart.push(existingProduct);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Product added to cart!');

    // Close the bottom sheet after adding to the cart
    setShowBottomSheet(false);
  };

  return (
    <div className="size-selector">
      <div className="size-options">
        {sizes.map((size, index) => (
          <div
            key={index}
            className={`size-option ${selectedSize === size ? 'selected' : ''}`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </div>
        ))}
      </div>
      <button onClick={addToCart} disabled={!selectedSize} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
}

export default SizeSelector;

