import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NonVeg.css";
import { Addtocart } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const priceRanges = [
  { id: 1, label: "₹0 - ₹200", min: 0, max: 200 },
  { id: 2, label: "₹201 - ₹500", min: 201, max: 500 },
  { id: 3, label: "₹501 - ₹1000", min: 501, max: 1000 },
];

function NonVeg() {
  const dispatch = useDispatch();
  const nonVegProducts = useSelector((state) => state.products?.nonveg || []);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRanges, setSelectedRanges] = useState([]);

  const itemsPerPage = 4;

  // Filter products by selected price ranges
  const filteredProducts =
    selectedRanges.length === 0
      ? nonVegProducts
      : nonVegProducts.filter((product) =>
          selectedRanges.some((rangeId) => {
            const range = priceRanges.find((r) => r.id === rangeId);
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
    const val = Number(value);
    if (checked) {
      setSelectedRanges((prev) => [...prev, val]);
    } else {
      setSelectedRanges((prev) => prev.filter((id) => id !== val));
    }
    setCurrentPage(1); // reset to first page on filter change
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
    <div className="non-veg-page">
      <h1 className="nonveg-title">Explore Our Non-Veg Products</h1>

      {nonVegProducts.length === 0 ? (
        <p className="no-products">No non-veg products available.</p>
      ) : (
        <div className="nonveg-layout-row">
          {/* Left Sidebar with Price Filter Checkboxes */}
          <aside className="filter-sidebar">
            <h4>Filter by Price Range</h4>
            <div className="price-filters">
              {priceRanges.map(({ id, label }) => (
                <label key={id} className="price-filter">
                  <input
                    type="checkbox"
                    value={id}
                    checked={selectedRanges.includes(id)}
                    onChange={handleCheckboxChange}
                  />
                  {label}
                </label>
              ))}
            </div>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear All Filters
            </button>
          </aside>

          {/* Main Products Content */}
          <main className="products-main">
            <ul className="card-grid">
              {currentItems.map((product, index) => (
                <li className="card" key={product.id || index}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="nonveg-image"
                  />
                  <div className="card-content">
                    <h3>{product.name}</h3>
                    <p>₹{product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
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
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next ▶
              </button>
            </div>
          </main>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default NonVeg;
