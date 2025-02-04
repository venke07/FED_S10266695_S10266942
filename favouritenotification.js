// favoriteNotification.js

document.addEventListener('DOMContentLoaded', () => {
    // Create and append notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
      const notificationContainer = document.createElement('div');
      notificationContainer.id = 'notification-container';
      notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        width: 300px;
      `;
      document.body.appendChild(notificationContainer);
    }
  
    // Show notification with product details
    const showProductNotification = (product) => {
      const notification = document.createElement('div');
      notification.style.cssText = `
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        margin-bottom: 10px;
        overflow: hidden;
        opacity: 0;
        transform: translateX(50px);
        transition: all 0.3s ease-in-out;
      `;
  
      notification.innerHTML = `
        <div style="padding: 15px;">
          <div style="display: flex; align-items: center; gap: 15px;">
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;"
            >
            <div>
              <div style="font-weight: bold; margin-bottom: 5px;">${product.name}</div>
              <div style="color: #666; font-size: 0.9em;">${product.price}</div>
            </div>
          </div>
          <div style="margin-top: 15px;">
            <button 
              class="buy-now-btn" 
              style="
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                width: 100%;
                font-weight: bold;
                transition: background-color 0.2s;
              "
              onmouseover="this.style.backgroundColor='#45a049'"
              onmouseout="this.style.backgroundColor='#4CAF50'"
            >
              Click here to buy
            </button>
          </div>
        </div>
      `;
  
      document.getElementById('notification-container').appendChild(notification);
  
      // Trigger animation
      setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
      }, 10);
  
      // Add click handler for buy button
      notification.querySelector('.buy-now-btn').addEventListener('click', () => {
        // Redirect to product purchase page
        window.location.href = `/purchase.html?product=${encodeURIComponent(product.id)}`;
      });
  
      // Remove notification after 5 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        setTimeout(() => notification.remove(), 300);
      }, 5000);
    };
  
    // Update favorite button click handler
    document.querySelectorAll('.favorite-button').forEach(button => {
      button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const product = {
          id: generateProductId(productCard),
          name: productCard.querySelector('.product-name').textContent,
          price: productCard.querySelector('.product-price').textContent,
          image: productCard.querySelector('img').src
        };
  
        // Only show notification when adding to favorites
        const favorites = getFavorites();
        const isAlreadyFavorite = favorites.some(fav => fav.id === product.id);
        
        if (!isAlreadyFavorite) {
          showProductNotification(product);
        }
      });
    });
  
    // Helper function to get favorites from localStorage
    function getFavorites() {
      const favorites = localStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    }
  
    // Helper function to generate product ID
    function generateProductId(productCard) {
      const productName = productCard.querySelector('.product-name').textContent;
      return productName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }
  });