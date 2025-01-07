import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import './ProductDetails.css';
import SearchHeader from '../components/SearchHeader'; 
import FloatingCart from '../components/FloatingCart';
import { FiHeart, FiHeartBroken } from 'react-icons/fi'; // Import both filled and broken heart icons

function ProductDetails() {
  const { id } = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false); // Track if the product is in the wishlist

  useEffect(() => {
    const productFound = products.find((prod) => prod.id === parseInt(id));
    setProduct(productFound);

    // Check if the product is already in the wishlist
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const productInWishlist = wishlist.some(item => item.id === productFound.id);
    setIsInWishlist(productInWishlist);
  }, [id, products]);

  const calculateDiscount = () => {
    if (product?.originalPrice && product?.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
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

    setShowAnimation(true);

    setTimeout(() => {
      setShowAnimation(false);
    }, 1000);
  };

  const addToWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductInWishlist = wishlist.some(item => item.id === product.id);

    if (!isProductInWishlist) {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsInWishlist(true); // Set the product as added to wishlist
    } else {
      // Remove from wishlist if already in
      const updatedWishlist = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false); // Set the product as removed from wishlist
    }
  };

  const discount = calculateDiscount();

  return (
    <div className="product-page">
      <SearchHeader placeholder={product ? product.filter : "Search for products..."} />
      {product ? (
        <>

          <div className="prod-image-wrapper">
            <img src={product.image} alt={product.name} className="prod-image" />
          </div>
          <div className="prod-details">
            <div className="price-container">
              <p className="price">R{product.price}</p>
              {discount > 0 && (
                <p className="discount-text">
                  DISCOUNT OF
                  <span className="discount-percent">{discount}%</span>
                </p>
              )}
              {product.originalPrice && <p className="original-price">R{product.originalPrice} </p>}
            </div>
            <p className="prod-name">{product.name}</p>
          </div>

          {/* Product Size Selector */}
          <div className="size-selector">
            <p className="size-text">Size:</p>
            <div className="size-options">
              {product.sizes.map((size, index) => (
                <div
                  key={index}
                  className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
         
         <div className="shipping-details">
           <p>Shipping Details </p>
         </div>

         <div className="description">
           <p>Description</p>
         </div>

        <div className="reviews">
            <p>Reviews</p>
        </div>

        <div className="add-button">
          {/* Conditional rendering for heart icon */}
          <FiHeart 
            className={`wish-list ${isInWishlist ? 'added' : ''}`} 
            onClick={addToWishlist} 
          />
          {/* Add to Cart Button */}
          {showAnimation && <div className="cart-dot"></div>}
          <button onClick={addToCart} className="add-to-cart">Add to Cart</button>
        </div>

        </>
      ) : (
        <p>Loading...</p>
      )}
      <FloatingCart />
    </div>
  );
}

export default ProductDetails;








