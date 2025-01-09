import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

const ProductContext = createContext();

// Custom hook to access the ProductContext
export const useProducts = () => {
  return useContext(ProductContext);
};

// ProductProvider component to provide the product data
const ProductProvider = ({ children }) => {
  const initialProducts = [

        // Men Products
        { 
          id: 1, 
          name: 'FLARE T-shirt black with', 
          price: 20, 
          originalPrice: 30.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'men', 
          filter: 'T-Shirts', 
          sizes: ['S', 'M', 'L', 'XL'] // Updated sizes
        },
        { 
          id: 2, 
          name: 'Black Jeans stonewashed', 
          price: 40, 
          originalPrice: 50.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'men', 
          filter: 'Jeans', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 3, 
          name: 'Shoes', 
          price: 30, 
          originalPrice: 40.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'men', 
          filter: 'Shoes', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 4, 
          name: 'Jacket', 
          price: 60, 
          originalPrice: 70.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'men', 
          filter: 'Jackets', 
          sizes: ['S', 'M', 'L', 'XL'] // Updated sizes
        },
        { 
          id: 5, 
          name: 'Sweater', 
          price: 35, 
          originalPrice: 50.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'men', 
          filter: 'New', 
          sizes: ['S', 'M', 'L'] // Updated sizes
        },
        { 
          id: 6, 
          name: 'Shorts', 
          price: 25, 
          originalPrice: 30.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'men', 
          filter: 'Sale', 
          sizes: ['S', 'M', 'L'] // Updated sizes
        },
        { 
          id: 7, 
          name: 'Hat', 
          price: 15, 
          originalPrice: 30.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'men', 
          filter: 'New', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 8, 
          name: 'Sneakers', 
          price: 50, 
          originalPrice: 59.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'men', 
          filter: 'Shoes', 
          sizes: ['One Size'] // One size available
        },
      
        // Women Products
        { 
          id: 21, 
          name: 'Dress', 
          price: 50, 
          originalPrice: 55.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'women', 
          filter: 'Dresses', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 22, 
          name: 'Skirt', 
          price: 30, 
          originalPrice: 40.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'women', 
          filter: 'Sale', 
          sizes: ['S', 'M', 'L'] // Updated sizes
        },
        { 
          id: 23, 
          name: 'Shoes', 
          price: 40, 
          originalPrice: 50.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'women', 
          filter: 'Shoes', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 24, 
          name: 'Jacket', 
          price: 60, 
          originalPrice: 69.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'women', 
          filter: 'Jackets', 
          sizes: ['S', 'M', 'L', 'XL'] // Updated sizes
        },
        { 
          id: 25, 
          name: 'Blouse', 
          price: 35, 
          originalPrice: 39.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'women', 
          filter: 'Tops', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 26, 
          name: 'T-shirt', 
          price: 25, 
          originalPrice: 30.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'women', 
          filter: 'New', 
          sizes: ['S', 'M', 'L', 'XL'] // Updated sizes
        },
        { 
          id: 27, 
          name: 'Pants', 
          price: 45, 
          originalPrice: 60.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'women', 
          filter: 'Jeans', 
          sizes: ['S', 'M', 'L'] // Updated sizes
        },
      
        // Jewellery Products
        { 
          id: 51, 
          name: 'Necklace', 
          price: 100, 
          originalPrice: 160.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Necklaces', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 52, 
          name: 'Ring', 
          price: 80, 
          originalPrice: 90.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Rings', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 53, 
          name: 'Bracelet', 
          price: 70, 
          originalPrice: 90.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Bracelets', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 54, 
          name: 'Earrings', 
          price: 60, 
          originalPrice: 90.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Earrings', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 55, 
          name: 'Watch', 
          price: 100, 
          originalPrice: 160.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Sale', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 56, 
          name: 'Diamond Necklace', 
          price: 500, 
          originalPrice: 660.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'New', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 57, 
          name: 'Gold Ring', 
          price: 200, 
          originalPrice: 260.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Rings', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 58, 
          name: 'Silver Bracelet', 
          price: 150, 
          originalPrice: 170.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Bracelets', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 59, 
          name: 'Pearl Earrings', 
          price: 90, 
          originalPrice: 990.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Earrings', 
          sizes: ['One Size'] // One size available
        },
        { 
          id: 60, 
          name: 'Gold Earrings', 
          price: 120, 
          originalPrice: 160.0, 
          image: 'https://via.placeholder.com/150', 
          category: 'jewellery', 
          filter: 'Earrings', 
          sizes: ['One Size'] // One size available
        }
      ];
      
  

        const [products, setProducts] = useState(initialProducts); // Store products in state
        const [activeCategory, setActiveCategory] = useState('men'); // Active category state (default 'women')
        const [activeFilterTabs, setActiveFilterTabs] = useState([]); // State for active filter tabs
        const [isLoadingFilters, setIsLoadingFilters] = useState(false); // Flag to handle loading state
        const [filter, setFilter] = useState(''); // Added state for filter
        const [searchQuery, setSearchQuery] = useState(''); // State for search functionality
      
        // Memoized category-specific filters
        const categoryFilters = useMemo(
          () => ({
            men: ['New', 'Sale', 'T-Shirts', 'Jeans', 'Jackets', 'Shoes'],
            women: ['New', 'Sale', 'Dresses', 'Tops', 'Jeans', 'Jackets'],
            brands: ['New', 'Sale', 'Nike', 'Adidas', 'Puma', 'Reebok'],
            home: ['Furniture', 'New', 'Sale', 'Decor', 'Lighting', 'Kitchen'],
            jewellery: ['Necklaces', 'Bracelets', 'New', 'Sale', 'Rings', 'Earrings'],
          }),
          []
        );
      
        const addProduct = (product) => {
          setProducts((prevProducts) => [...prevProducts, product]);
        };
      
        const deleteProduct = (id) => {
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        };
      
        const changeCategory = (category) => {
          setActiveCategory(category.toLowerCase());
          setIsLoadingFilters(true); // Trigger loading state when switching tabs
        };
      
        // Filter products based on category and active filters
        const filteredProducts = useMemo(() => {
          return products.filter((product) => {
            const isCategoryMatch = activeCategory === 'all' || product.category === activeCategory;
            const isFilterMatch = activeFilterTabs.length === 0 || activeFilterTabs.includes(product.filter);
            return isCategoryMatch && isFilterMatch;
          });
        }, [activeCategory, activeFilterTabs, products]);
      
        // Get all products without any filtering applied
        const allProducts = useMemo(() => {
          return products; // Simply return all products without applying any filters
        }, [products]);
      
        useEffect(() => {
          if (categoryFilters[activeCategory]) {
            setActiveFilterTabs(categoryFilters[activeCategory]); // Update the filters for the active category
          } else {
            setActiveFilterTabs([]); // Reset to empty filters if no filters are defined
          }
      
          setIsLoadingFilters(false);
        }, [activeCategory, categoryFilters]);
      
        return (
          <ProductContext.Provider
            value={{
              products: filteredProducts, // Pass the filtered products
              allProducts,              // Pass all products (no filtering)
              addProduct,
              deleteProduct,
              changeCategory,           // Expose the category change function
              activeCategory,           // Expose the activeCategory for use in other components
              activeFilterTabs,         // Expose active filter tabs for use in components
              setActiveFilterTabs,      // Explicitly expose setActiveFilterTabs to the context
              isLoadingFilters,         // Pass loading state to the context
              filter,                   // Pass the filter state
              setFilter,                // Pass the setFilter function to allow filter changes
              searchQuery,              // Pass the search query state
              setSearchQuery,           // Pass the setSearchQuery function for search updates
            }}
          >
            {children}
          </ProductContext.Provider>
        );
      };
      
      export default ProductProvider;
      





















