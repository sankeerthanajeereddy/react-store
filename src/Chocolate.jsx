import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './veg.css';
import { Addtocart } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Chocolate() {
  const dispatch = useDispatch();
  const chocolateProducts = useSelector((state) => state.products?.chocolates || []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  // Store selected price ranges as array of keys
  const [selectedRanges, setSelectedRanges] = useState([]);

  const itemsPerPage = 6;

  // Define price ranges for checkboxes
  const priceRanges = [
    { id: 'under50', label: 'Under ₹50', min: 0, max: 49 },
    { id: '50to100', label: '₹50 - ₹100', min: 50, max: 100 },
    { id: '100to200', label: '₹100 - ₹200', min: 101, max: 200 },
    { id: 'above200', label: 'Above ₹200', min: 201, max: Infinity },
  ];

  // Filter function checks if product price is in any selected range
  const filteredProducts = selectedRanges.length === 0
    ? chocolateProducts
    : chocolateProducts.filter(product =>
        selectedRanges.some(rangeId => {
          const range = priceRanges.find(r => r.id === rangeId);
          return product.price >= range.min && product.price <= range.max;
        })
      );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setCurrentPage(1); // Reset to first page on filter change

    if (checked) {
      setSelectedRanges(prev => [...prev, value]);
    } else {
      setSelectedRanges(prev => prev.filter(id => id !== value));
    }
  };

  const clearFilters = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
    toast.success("Product added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  return (
    <div className="container chocolate-container">
      <h1>These are Chocolate Products</h1>

      <div className="chocolate-layout">
        {/* Sidebar with checkbox filters */}
        <aside className="price-checkboxes">
          <h4>Filter by Price Range</h4>
          <form>
            {priceRanges.map(range => (
              <label key={range.id} className="price-checkbox-label">
                <input
                  type="checkbox"
                  value={range.id}
                  checked={selectedRanges.includes(range.id)}
                  onChange={handleCheckboxChange}
                />
                {range.label}
              </label>
            ))}
          </form>
          <button className="clear-filters-btn" onClick={clearFilters}>Clear Filters</button>
        </aside>

        {/* Product list and pagination */}
        <main className="products-main">
          {filteredProducts.length === 0 ? (
            <p className="no-products">No chocolate products available in this price range.</p>
          ) : (
            <>
              <ol className="card-grid">
                {currentItems.map((product, index) => (
                  <li className="card" key={index}>
                    <img src={product.image} alt={product.name} />
                    <div className="card-content">
                      <h3>{product.name}</h3>
                      <p>₹{product.price}</p>
                      <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>◀ Prev</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={currentPage === i + 1 ? 'active-page' : ''}
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next ▶</button>
              </div>
            </>
          )}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Chocolate;
