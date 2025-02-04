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
      top: 60px; /* Adjusted to avoid overlapping with the bell */
      right: 20px;
      z-index: 1000;
    `;
    document.body.appendChild(messageContainer);
  }

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
        showMessage(`${productDetails.name} added to favorites!`);
        updateNotificationDot();
      } else {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        button.querySelector('.heart-icon').style.fill = 'none';
        showMessage(`${productDetails.name} removed from favorites!`, false);
        updateNotificationDot();
      }

      saveFavorites(favorites);
    });
  });

  // Update notification dot and animate bell
  const updateNotificationDot = () => {
    const notificationBell = document.querySelector('.icon[alt="Notification Bell"]');
    if (notificationBell) {
      let dot = notificationBell.nextElementSibling;
      if (!dot || !dot.classList.contains('notification-dot')) {
        dot = document.createElement('span');
        dot.classList.add('notification-dot');
        dot.style.cssText = `
          position: absolute;
          top: 10px;
          right: 100px;
          width: 10px;
          height: 10px;
          background-color: red;
          border-radius: 50%;
        `;
        notificationBell.parentElement.appendChild(dot);
      }
      const favorites = getFavorites();
      if (favorites.length === 0) {
        dot.style.display = 'none';
      } else {
        dot.style.display = 'block';
      }
      notificationBell.classList.add('bell-animation');
      setTimeout(() => {
        notificationBell.classList.remove('bell-animation');
      }, 1000); // Animation duration
    }
  };

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
            const textNode = document.createTextNode(`${favorite.name} has been added to your favorites. `);
            const moreInfo = document.createElement('span');
            moreInfo.textContent = 'Click here to find out more.';
            moreInfo.style.color = '#007bff'; // Change text color
            item.appendChild(img);
            item.appendChild(textNode);
            item.appendChild(moreInfo);
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