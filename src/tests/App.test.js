import React from "react";
import { render, fireEvent, screen , waitFor , queryByText , act} from "@testing-library/react";
import App from "../App";


describe("App", () => {
  it("renders_without_crashing", () => {
    render(<App />);
  });

  it('adds_a_product_to_the_cart_when_Add_to_Cart_is_clicked', () => {
    const { getByText, queryByText } = render(<App />);

    const product1 = getByText("Product 1");
    fireEvent.click(product1);

    const addToCartButton = getByText("Add to Cart");
    fireEvent.click(addToCartButton);

    const cartItem = queryByText("Product 1 - $19.99");
    expect(cartItem).toBeInTheDocument();
  });

  it("displays_total_amount_and_cart_items_correctly_in_the_cart", () => {
    const { getByText } = render(<App />);

    const product1 = getByText("Product 1");
    const product2 = getByText("Product 2");

    fireEvent.click(product1);
    const addToCartButton1 = getByText("Add to Cart");
    fireEvent.click(addToCartButton1);

    fireEvent.click(product2);
    const addToCartButton2 = getByText("Add to Cart");
    fireEvent.click(addToCartButton2);

    const totalAmount = getByText("Total Amount: $49.98");
    expect(totalAmount).toBeInTheDocument();

    const cartItem1 = getByText("Product 1 - $19.99");
    const cartItem2 = getByText("Product 2 - $29.99");
    expect(cartItem1).toBeInTheDocument();
    expect(cartItem2).toBeInTheDocument();
  });

  it("displays_an_empty_cart_message_when_the_cart_is_empty", () => {
    const { getByText } = render(<App />);

    const emptyCartMessage = getByText("Your cart is empty.");
    expect(emptyCartMessage).toBeInTheDocument();
  });

});
describe("Product component", () => {
  it("adds_and_removes_products_from_cart", () => {
    const { getByText, getByAltText } = render(<App />);
    
    // Simulate adding a product to cart
    fireEvent.click(getByAltText("Product 1"));
    fireEvent.click(getByText("Add to Cart"));
    
    // Verify cart content
    expect(getByText("Cart")).toBeInTheDocument();
    expect(getByText("Product 1 - $19.99")).toBeInTheDocument();

    // Simulate removing a product from cart
    fireEvent.click(getByText("Remove"));
    expect(getByText("Your cart is empty.")).toBeInTheDocument();
  });
});


describe("Product component", () => {
  it("displays_confirmation_message_after_checkout", async () => {
    const { container, getByText, getByAltText, queryByText } = render(<App />);
    
    // Simulate adding a product to cart
    fireEvent.click(getByAltText("Product 1"));
    fireEvent.click(getByText("Add to Cart"));
    
    // Simulate checkout and verify confirmation message
    fireEvent.click(getByText("Checkout"));
    expect(getByText("Thank you for your order! Your items will be shipped soon.")).toBeInTheDocument();

    // Close confirmation message
    fireEvent.click(getByText("Close"));

    // Verify that confirmation message is closed
    await waitFor(() => {
      expect(queryByText(container, "Thank you for your order! Your items will be shipped soon.")).toBeNull();
    });
  });
});

