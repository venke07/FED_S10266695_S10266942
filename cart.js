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

  // Create dropdown container for notification bell
  const createDropdownContainer = () => {
    const dropdownContainer = document.createElement('div');
    dropdownContainer.id = 'dropdown-container';
    dropdownContainer.style.cssText = `
      position: absolute;
      top: 40px;
      right: 0;
      width: 400px; /* Make the dropdown bigger */
      max-height: 400px; /* Add max height */
      overflow-y: auto; /* Add scroll if content overflows */
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      display: none;
      z-index: 1000;
    `;
    document.body.appendChild(dropdownContainer);
  };

  createDropdownContainer();

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
        showNotification(`${productDetails.name} added to favorites!`, 'success', productDetails.image);
        updateNotificationDot();
      } else {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        button.querySelector('.heart-icon').style.fill = 'none';
        showNotification(`${productDetails.name} removed from favorites!`, 'error', productDetails.image);
        updateNotificationDot();
      }

      saveFavorites(favorites);
    });
  });

  // Add click event listener to notification bell
  const notificationBell = document.querySelector('.icon[alt="Notification Bell"]');
  if (notificationBell) {
    notificationBell.addEventListener('click', () => {
      const dropdownContainer = document.getElementById('dropdown-container');
      if (dropdownContainer.style.display === 'block') {
        dropdownContainer.style.display = 'none';
      } else {
        const favorites = getFavorites();
        dropdownContainer.innerHTML = ''; // Clear previous content

        if (favorites.length > 0) {
          favorites.forEach(favorite => {
            const item = document.createElement('div');
            item.style.cssText = `
              display: flex;
              align-items: center;
              padding: 10px;
              border-bottom: 1px solid #ddd;
              cursor: pointer; /* Change cursor to pointer on hover */
            `;
            const img = document.createElement('img');
            img.src = favorite.image;
            img.style.cssText = `
              width: 50px;
              height: 50px;
              margin-right: 10px;
              border-radius: 4px;
            `;
            const textNode = document.createTextNode(`${favorite.name} - ${favorite.price}`);
            item.appendChild(img);
            item.appendChild(textNode);
            dropdownContainer.appendChild(item);
          });
        } else {
          const noFavoritesMessage = document.createElement('div');
          noFavoritesMessage.textContent = 'No new notifications.';
          noFavoritesMessage.style.padding = '10px';
          dropdownContainer.appendChild(noFavoritesMessage);
        }

        dropdownContainer.style.display = 'block';
      }
    });
  }

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

  // Initial call to update the notification dot on page load
  updateNotificationDot();
});