// favorites.js

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
      } else {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        button.querySelector('.heart-icon').style.fill = 'none';
      }

      saveFavorites(favorites);
    });
  });

  // Generate a unique ID for each product based on its name
  function generateProductId(productCard) {
    const productName = productCard.querySelector('.product-name').textContent;
    return productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
  }

  // Update button state based on whether product is in favorites
  function updateFavoriteButtonState(button, productId) {
    const favorites = getFavorites();
    const isFavorited = favorites.some(fav => fav.id === productId);
    button.querySelector('.heart-icon').style.fill = isFavorited ? 'red' : 'none';
  }


  // Update button state based on whether product is in favorites
  function updateFavoriteButtonState(button, productId) {
    const favorites = getFavorites();
    const isFavorited = favorites.some(fav => fav.id === productId);
    button.querySelector('.heart-icon').style.fill = isFavorited ? 'red' : 'none';
  }
});
