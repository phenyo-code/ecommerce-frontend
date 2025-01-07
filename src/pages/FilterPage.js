import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import SearchHeader from '../components/SearchHeader';
import FloatingCart from '../components/FloatingCart';
import ProductList from '../components/ProductList'; // Import ProductList

const FilterPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filter = queryParams.get('filter'); // Get filter query param
  const category = queryParams.get('category'); // Get category query param

  const { changeCategory, setActiveFilterTabs } = useProducts();

  useEffect(() => {
    // Update category when filter page loads
    if (category) {
      changeCategory(category);
    }

    // When a filter is clicked, update activeFilterTabs with the filter type
    if (filter) {
      setActiveFilterTabs([filter]); // This ensures only the selected filter is applied
    }
  }, [category, filter, changeCategory, setActiveFilterTabs]);

  return (
    <div className="filter-page">
      <SearchHeader placeholder={filter || "Search for products..."} />


      <div className="filter-list">
        {/* Pass the filter prop to ProductList */}
        <ProductList filter={filter} />
      </div>
      <FloatingCart />
    </div>
  );
};

export default FilterPage;






