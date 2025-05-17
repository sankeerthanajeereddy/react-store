import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './fruits.css';
import { Addtocart } from "./store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Fruits() {
  const dispatch = useDispatch();
  const fruitsProducts = useSelector((state) => state.products?.fruits || []);

  // Define price ranges for checkbox filtering
  const priceRanges = [
    { id: 1, label: "Under ₹50", min: 0, max: 50 },
    { id: 2, label: "₹51 - ₹100", min: 51, max: 100 },
    { id: 3, label: "₹101 - ₹150", min: 101, max: 150 },
    { id: 4, label: "₹151 - ₹200", min: 151, max: 200 },
    { id: 5, label: "Above ₹200", min: 201, max: Infinity },
  ];

  // State to store selected price range IDs
  const [selectedRanges, setSelectedRanges] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter products based on selected price ranges
  const filteredProducts = selectedRanges.length === 0
    ? fruitsProducts
    : fruitsProducts.filter(product =>
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

  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
    toast.success("Product added to cart successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  // Checkbox toggle handler
  const toggleRange = (id) => {
    setCurrentPage(1);
    setSelectedRanges(prev => 
      prev.includes(id)
        ? prev.filter(rangeId => rangeId !== id)
        : [...prev, id]
    );
  };

  // Clear all filters
  const handleClearFilter = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  return (
    <div className="fruits-wrapper">
      <div className="fruits-container">
        <h1 className="fruits-title">Explore Our Fruits Products</h1>

        <div className="fruits-layout">
          {/* Sidebar with checkboxes */}
          <aside className="filter-sidebar">
            <h3>Filter by Price Range</h3>
            <div className="price-checkboxes">
              {priceRanges.map(range => (
                <label key={range.id} className="price-checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedRanges.includes(range.id)}
                    onChange={() => toggleRange(range.id)}
                  />
                  {range.label}
                </label>
              ))}
            </div>
            <button onClick={handleClearFilter} className="clear-filters-btn">
              Clear Filter
            </button>
          </aside>

          {/* Product Grid */}
          <main className="fruits-main">
            {filteredProducts.length === 0 ? (
              <p className="no-products">No fruits products available in this range.</p>
            ) : (
              <>
                <ul className="card-grid">
                  {currentItems.map((product, index) => (
                    <li className="card" key={index}>
                      <img src={product.image} alt={product.name} className="fruits-image" />
                      <div className="card-content">
                        <h3>{product.name}</h3>
                        <p>₹{product.price}</p>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Pagination */}
                <div className="pagination">
                  <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    ◀ Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={currentPage === i + 1 ? "active-page" : ""}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next ▶
                  </button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Fruits;
