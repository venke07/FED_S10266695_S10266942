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
      top: 55px;
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
    const productId = productCard.getAttribute('data-product-id');

    // Set initial state
    updateFavoriteButtonState(button, productId);

    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Stop event propagation to prevent navigation

      const favorites = getFavorites();
      const productDetails = {
        id: productId,
        name: productCard.querySelector('.product-name')?.textContent,
        price: productCard.querySelector('.product-price')?.textContent,
        description: productCard.querySelector('.product-description')?.textContent,
        condition: productCard.querySelector('.product-condition')?.textContent,
        userimage: productCard.querySelector('.product-user-icon')?.getAttribute('src'),
        sellername: productCard.querySelector('.product-seller-name')?.textContent,
        listingtime: productCard.querySelector('.listing-time')?.textContent,
        image: productCard.querySelector('img:not(.product-user-icon)')?.getAttribute('src')
      };
      
      const existingIndex = favorites.findIndex(fav => fav.id === productId);
      let notifications = JSON.parse(localStorage.getItem('notificationList')) || [];
      
      if (existingIndex === -1) {
        favorites.push(productDetails);
        notifications.push(productDetails); // Add to notifications separately
        localStorage.setItem('notificationList', JSON.stringify(notifications));
        button.querySelector('.heart-icon').style.fill = 'red';
        showMessage(`${productDetails.name} added to favorites!`);
      } else {
        favorites.splice(existingIndex, 1);
        button.querySelector('.heart-icon').style.fill = 'none';
        showMessage(`${productDetails.name} removed from favorites!`, false);

        // Remove from notifications
        notifications = notifications.filter(n => n.id !== productId);
        localStorage.setItem('notificationList', JSON.stringify(notifications));
      }
      
      // Only update `favorites`, don't touch notifications
      saveFavorites(favorites);
    });
  });

  // Function to update the notification bell
  function updateNotificationBell() {
    const notificationDot = document.querySelector('.notification-dot');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (notificationDot) {
        notificationDot.style.display = 'none'; // Hide the notification dot
    }
  }

  // Call updateNotificationBell on page load to ensure the bell is updated
  document.addEventListener('DOMContentLoaded', function() {
      updateNotificationBell();
  });

  // Ensure the notification bell is updated when a product is liked
  document.addEventListener('click', function(event) {
      if (event.target.closest('.favorite-btn')) {
          updateNotificationBell();
      }
  });

  // Add click event listener to notification bell
const notificationBell = document.querySelector('.icon[alt="Notification Bell"]');
if (notificationBell) {
  notificationBell.addEventListener('click', () => {
    const dropdownContainer = document.getElementById('dropdown-container');
    if (dropdownContainer.style.display === 'block') {
      dropdownContainer.style.display = 'none';
    } else {
      const notifications = JSON.parse(localStorage.getItem('notificationList')) || [];
      dropdownContainer.innerHTML = ''; // Clear previous content

      if (notifications.length > 0) {
        notifications.forEach(favorite => {
          const item = document.createElement('div');
          item.style.cssText = `
            display: flex;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid #ddd;
            position: relative;
            cursor: pointer; /* Add pointer cursor */
          `;
          const img = document.createElement('img');
          img.src = favorite.image;
          img.style.cssText = `
            width: 50px;
            height: 50px;
            margin-right: 10px;
            border-radius: 4px;
          `;
          const textContainer = document.createElement('div');
          textContainer.style.cssText = `
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            max-width: 250px; /* Set a fixed width for the text container */
          `;
          const textNode = document.createTextNode(`${favorite.name} - ${favorite.price}`);
          const moreInfo = document.createElement('span');
          moreInfo.textContent = 'Click here to find out more.';
          moreInfo.style.cssText = `
            color: #007bff;
            margin-top: 5px;
          `;
          textContainer.appendChild(textNode);
          textContainer.appendChild(moreInfo);
          item.appendChild(img);
          item.appendChild(textContainer);

          // Add close button to remove individual notification
          const closeButton = document.createElement('button');
          closeButton.textContent = 'X';
          closeButton.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: #f44336;
            font-size: 16px;
            cursor: pointer;
          `;
          closeButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering the item click event

            let notifications = JSON.parse(localStorage.getItem('notificationList')) || [];
            notifications = notifications.filter(n => n.id !== favorite.id); // Remove specific notification
            localStorage.setItem('notificationList', JSON.stringify(notifications));

            item.remove();

            // If no more notifications, display a message
            if (notifications.length === 0) {
              dropdownContainer.innerHTML = '<div style="padding: 10px;">No new notifications.</div>';
            }
          });

          item.appendChild(closeButton);

          item.addEventListener('click', () => {
            if (favorite.id === 'asusroggaminglaptop') {
              window.location.href = 'trusted_sellers/abex.html';
            } else {
              const cleanProductId = favorite.id.replace(/-/g, ''); // Remove hyphens
              window.location.href = `product-details.html?productId=${encodeURIComponent(cleanProductId)}`;
            }
          });

          dropdownContainer.appendChild(item);
        });

        // Add "Clear All Notifications" button
        const clearAllButton = document.createElement('button');
        clearAllButton.textContent = 'Clear All Notifications';
        clearAllButton.style.cssText = `
          display: block;
          width: 100%;
          padding: 10px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 0 0 8px 8px;
          cursor: pointer;
        `;
        clearAllButton.addEventListener('click', () => {
          localStorage.removeItem('notificationList');  // Only clear notifications
          dropdownContainer.innerHTML = '<div style="padding: 10px;">No new notifications.</div>';
        });
        dropdownContainer.appendChild(clearAllButton);
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
    return productName.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function updateFavoriteButtonState(button, productId) {
    const favorites = getFavorites();
    const isFavorited = favorites.some(fav => fav.id === productId);
    button.querySelector('.heart-icon').style.fill = isFavorited ? 'red' : 'none';
  }

  // Initial call to update the notification dot on page load
  updateNotificationBell();
});
