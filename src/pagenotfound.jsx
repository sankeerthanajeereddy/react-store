import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function pagenotfound() {
  let navigate = useNavigate();

  // Redirect to home after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate("/"); // Redirect to home page (or your desired page)
    }, 3000);
  }, [navigate]);

  return (
    <>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </>
  );
}

export default pagenotfound;