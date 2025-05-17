import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Addtocart } from './store';
import './veg.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const priceRanges = [
  { label: '₹0 - ₹100', min: 0, max: 100 },
  { label: '₹101 - ₹200', min: 101, max: 200 },
  { label: '₹201 - ₹300', min: 201, max: 300 },
  { label: '₹301+', min: 301, max: Infinity },
];

function Veg() {
  const vegProducts = useSelector((state) => state.products.veg || []);
  const dispatch = useDispatch();

  const [selectedRanges, setSelectedRanges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleCheckboxChange = (range) => {
    if (selectedRanges.includes(range)) {
      setSelectedRanges(selectedRanges.filter((r) => r !== range));
    } else {
      setSelectedRanges([...selectedRanges, range]);
    }
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const filteredProducts = vegProducts.filter((product) => {
    if (selectedRanges.length === 0) return true;
    return selectedRanges.some(({ min, max }) => product.price >= min && product.price <= max);
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
    toast.success('Product added successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="veg-container">
      <h1 className="veg-title">Explore Our Fresh Veg Items</h1>

      <div className="veg-layout-row">
        {/* Left Sidebar - Price Filter */}
        <aside className="filter-sidebar">
          <h4>Filter by Price:</h4>
          {priceRanges.map((range, index) => (
            <label key={index} className="filter-label">
              <input
                type="checkbox"
                checked={selectedRanges.includes(range)}
                onChange={() => handleCheckboxChange(range)}
              />
              {range.label}
            </label>
          ))}
          <button className="clear-filters-btn" onClick={handleClearFilters}>
            Clear All Filters
          </button>
        </aside>

        {/* Main Content - Products Grid */}
        <main className="products-main">
          <ul className="card-grid">
            {currentItems.map((product, index) => (
              <li key={index} className="card">
                <img src={product.image} alt={product.name} className="veg-image" />
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <p>₹{product.price}</p>
                  <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              ◀ Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? 'active-page' : ''}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next ▶
            </button>
          </div>
        </main>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Veg;
