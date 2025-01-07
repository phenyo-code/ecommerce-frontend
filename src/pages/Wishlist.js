import React, { useState, useEffect } from 'react';
import WishListCard from '../components/WishlistCard';
import SearchHeader from '../components/SearchHeader';
import './Wishlist.css'; // Your custom styles

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  };

  return (
    <div className="wishlist-page">
        <SearchHeader />
      <h3>Your Wishlist</h3>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty. Start adding products!</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((product) => (
            <WishListCard
              key={product.id}
              product={product}
              removeFromWishlist={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;





