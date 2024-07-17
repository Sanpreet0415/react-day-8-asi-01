// src/Products.jsx

import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom'; // Ensure useHistory is imported correctly
import { useSearchParams } from 'react-router-dom';
import ProductList from './ProductList';
import LoadingSpinner from './LoadingSpinner'; // Ensure this matches the filename and path

const Products = () => {
  const location = useLocation();
  const history = useHistory(); // Ensure useHistory is correctly imported
  const searchParams = new URLSearchParams(location.search);
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || '');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [location.search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products${location.search}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'category') {
      setCategory(value);
    } else if (name === 'priceRange') {
      setPriceRange(value);
    }
  };

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (priceRange) params.set('priceRange', priceRange);
    history.push({
      pathname: '/products',
      search: params.toString(),
    });
  };

  return (
    <div>
      <h2>Products</h2>
      <div>
        <label>Category:</label>
        <input type="text" name="category" value={category} onChange={handleFilterChange} />
      </div>
      <div>
        <label>Price Range:</label>
        <input type="text" name="priceRange" value={priceRange} onChange={handleFilterChange} />
      </div>
      <button onClick={applyFilters}>Apply Filters</button>
      {loading ? <LoadingSpinner /> : <ProductList products={products} />}
    </div>
  );
};

export default Products;
