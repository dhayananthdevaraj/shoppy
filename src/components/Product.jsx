import React, { useState } from "react";
import { productsData } from "./ProductData";


function Product() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
 
  const [showConfirmation, setShowConfirmation] = useState({
    isVisible: false,
    message: ""
  });

  const getTotalAmount = () => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      const updatedCart = [...cart, selectedProduct];
      setCart(updatedCart);
      setSelectedProduct(null);
    }
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      setShowConfirmation({
        isVisible: true,
        message: "Your cart is empty."
      });
    } else {
      setShowConfirmation({
        isVisible: true,
        message: "Thank you for your order! Your items will be shipped soon."
      });
      setCart([]); // Clear the cart after checkout
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation({
      isVisible: false,
      message: ""
    });
  };

  return (
    <div className="app">
      <h1>Neo Shoppy</h1>
      <div className="product-list">
        {productsData.map((product) => (
          <div
            key={product.id}
            className={`product ${
              selectedProduct === product ? "selected" : ""
            }`}
            onClick={() => handleProductSelect(product)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-details">
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>${selectedProduct.price.toFixed(2)}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      )}
       <div className="cart">
        <h2>Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((product) => (
                <li key={product.id}>
                  {product.name} - ${product.price.toFixed(2)}{" "}
                  <button onClick={() => handleRemoveFromCart(product.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p>Total Amount: ${getTotalAmount()}</p>
          </div>
        )}
        <button onClick={handleCheckout}>Checkout</button>
        </div>
      {showConfirmation.isVisible && (
        <div className="confirmation-modal">
          <div className="confirmation-card">
            <p>{showConfirmation.message}</p>
            <button onClick={handleCloseConfirmation}>Close</button>
          </div>
        </div>
      )}
    </div>
     
    
  );
}

export default Product;