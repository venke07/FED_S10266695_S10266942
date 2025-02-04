document.addEventListener('DOMContentLoaded', () => {
  const favoritesContainer = document.getElementById('favorites-container');
  if (!favoritesContainer) return; // Exit if not on favorites page

  // Create message container
  const messageContainer = document.createElement('div');
  messageContainer.id = 'message-container';
  messageContainer.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
  `;
  document.body.appendChild(messageContainer);

  // Show message function
  const showMessage = (text) => {
    const message = document.createElement('div');
    message.style.cssText = `
      background-color: #f44336;
      color: white;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 10px;
      opacity: 0;
      transition: opacity 0.3s ease-in;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    message.textContent = text;
    messageContainer.appendChild(message);

    // Fade in
    setTimeout(() => message.style.opacity = '1', 10);

    // Remove after 3 seconds
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  };

  // Function to display no favorites message
  const showNoFavoritesMessage = () => {
    favoritesContainer.innerHTML = '<p class="center-message">No favorite items yet</p>';
  };

  // Function to render all favorites
  const renderFavorites = () => {
    // Get fresh data from localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Clear existing content
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
      showNoFavoritesMessage();
      return;
    }

    // Create and display each favorite item
    favorites.forEach(item => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p class="product-name">${item.name}</p>
        <p class="product-price">${item.price}</p>
        <button class="favorite-button" data-item-id="${item.id}" style="color: red;">
          <svg xmlns="http://www.w3.org/2000/svg" class="heart-icon" viewBox="0 0 24 24"
               style="fill: red; stroke: red;"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      `;

      // Add click handler to heart button
      const favoriteButton = productCard.querySelector('.favorite-button');

      favoriteButton.addEventListener('click', () => {
        // Get current favorites
        const currentFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        // Remove the item from favorites
        const updatedFavorites = currentFavorites.filter(fav => fav.id !== item.id);

        // Show removal message
        showMessage(`${item.name} removed from favorites`);

        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

        // Re-render the favorites
        renderFavorites();
      });

      favoritesContainer.appendChild(productCard);
    });
  };

  // Initial render
  renderFavorites();
});