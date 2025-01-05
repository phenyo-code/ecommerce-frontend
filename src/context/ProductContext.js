import React, { createContext, useState, useContext } from 'react';

// Create ProductContext
const ProductContext = createContext();

// Custom hook to access the ProductContext
export const useProducts = () => {
  return useContext(ProductContext);
};

// ProductProvider component to provide the product data
const ProductProvider = ({ children }) => {
  const initialProducts = [
    { id: 1, name: 'T-shirt', price: 20, image: 'tshirt.jpg', category: 'men' },
    { id: 2, name: 'Jeans', price: 40, image: 'jeans.jpg', category: 'men' },
    { id: 3, name: 'Jacket', price: 60, image: 'jacket.jpg', category: 'women' },
    { id: 4, name: 'Dress', price: 50, image: 'dress.jpg', category: 'women' },
    { id: 5, name: 'Shoes', price: 30, image: 'shoes.jpg', category: 'men' },
  ];

  const [products, setProducts] = useState(initialProducts); // Store products in state
  const [activeCategory, setActiveCategory] = useState('men'); // Active category state (default 'men')

  // Function to add a new product
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  // Function to delete a product by its id
  const deleteProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  // Function to update active category
  const changeCategory = (category) => {
    setActiveCategory(category.toLowerCase()); // Ensure the category is always lowercase
  };

  // Filter products based on selected category
  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts, // Only pass the filtered products
        addProduct,
        deleteProduct,
        changeCategory, // Expose the category change function
        activeCategory, // Expose the activeCategory for use in other components
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;



