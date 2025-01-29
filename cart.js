document.addEventListener('DOMContentLoaded', () => {
  // Initialize favorites from localStorage
  const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  };

  // Save favorites to localStorage
  const saveFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };

  // Create message container if it doesn't exist
  if (!document.getElementById('message-container')) {
    const messageContainer = document.createElement('div');
    messageContainer.id = 'message-container';
    messageContainer.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    `;
    document.body.appendChild(messageContainer);
  }

  // Show message function
  const showMessage = (text, isSuccess = true) => {
    const message = document.createElement('div');
    message.style.cssText = `
      background-color: ${isSuccess ? '#4CAF50' : '#f44336'};
      color: white;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 10px;
      opacity: 0;
      transition: opacity 0.3s ease-in;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    message.textContent = text;
    document.getElementById('message-container').appendChild(message);

    // Fade in
    setTimeout(() => message.style.opacity = '1', 10);

    // Remove after 3 seconds
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  };

  // Add click event listeners to all favorite buttons
  document.querySelectorAll('.favorite-button').forEach(button => {
    const productCard = button.closest('.product-card');
    const productId = generateProductId(productCard);

    // Set initial state
    updateFavoriteButtonState(button, productId);

    button.addEventListener('click', () => {
      const favorites = getFavorites();
      const productDetails = {
        id: productId,
        name: productCard.querySelector('.product-name').textContent,
        price: productCard.querySelector('.product-price').textContent,
        image: productCard.querySelector('img').src
      };

      const existingIndex = favorites.findIndex(fav => fav.id === productId);

      if (existingIndex === -1) {
        // Add to favorites
        favorites.push(productDetails);
        button.querySelector('.heart-icon').style.fill = 'red';
        showMessage(`${productDetails.name} added to favorites!`, true);
      } else {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        button.querySelector('.heart-icon').style.fill = 'none';
        showMessage(`${productDetails.name} removed from favorites!`, false);
      }

      saveFavorites(favorites);
    });
  });

  // Your existing functions remain the same
  function generateProductId(productCard) {
    const productName = productCard.querySelector('.product-name').textContent;
    return productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }

  function updateFavoriteButtonState(button, productId) {
    const favorites = getFavorites();
    const isFavorited = favorites.some(fav => fav.id === productId);
    button.querySelector('.heart-icon').style.fill = isFavorited ? 'red' : 'none';
  }
});