// Modal Elements
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const closeCartBtn = document.getElementById('close-cart');
const cartIcon = document.getElementById('shopping-cart-icon');

// Show the modal when the cart icon is clicked
cartIcon.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsList.innerHTML = '';

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li>Your cart is empty!</li>';
  } else {
    cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      
      // Directly use the price as a string
      listItem.innerHTML = `
        <span>${item.name}</span>
        <span>${item.price}</span> <!-- Show price as string (with '$' symbol) -->
      `;

      cartItemsList.appendChild(listItem);
    });
  }

  // Show the modal
  cartModal.classList.remove('hidden');
});

// Close the modal when the close button is clicked
closeCartBtn.addEventListener('click', () => {
  cartModal.classList.add('hidden');
});

// Close the modal when clicking outside the content area
cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.classList.add('hidden');
  }
});
