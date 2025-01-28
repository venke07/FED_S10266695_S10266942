// Function to handle adding a product to the cart
function addToCart(productName, productPrice, productImage) {
    try {
      // Retrieve the existing cart from local storage or initialize a new array
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Create a new product object
      const product = {
        name: productName,
        price: productPrice,
        image: productImage,
      };
  
      // Add the product to the cart array
      cart.push(product);
  
      // Save the updated cart back to local storage
      localStorage.setItem('cart', JSON.stringify(cart));
  
      // Notify the user
      alert(`${productName} has been added to your cart!`);
      console.log(`Product added: `, product); // Debug log
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  
  // Add event listeners to all "Add to Cart" buttons
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.add-to-cart');
  
    if (buttons.length === 0) {
      console.warn('No "Add to Cart" buttons found!');
    }
  
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        // Find the relevant product details
        const productCard = button.closest('.product-card');
        if (!productCard) {
          console.error('Product card not found for button:', button);
          return;
        }
  
        const productName = productCard.querySelector('.product-name')?.textContent;
        const productPrice = productCard.querySelector('.product-price')?.textContent;
        const productImage = productCard.querySelector('img')?.src;
  
        if (!productName || !productPrice || !productImage) {
          console.error('Incomplete product details:', { productName, productPrice, productImage });
          return;
        }
  
        // Add the product to the cart
        addToCart(productName, productPrice, productImage);
      });
    });
  });
  