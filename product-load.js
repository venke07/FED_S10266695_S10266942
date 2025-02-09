// Initialize product cards on main page
function initializeProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (event) => {
            // Prevent navigation if clicking the favorite button
            if (event.target.closest('.favorite-button')) {
                event.stopPropagation();
                return;
            }

            const productId = card.getAttribute('data-product-id');
            if (productId) {
                if (productId === 'asusroggaminglaptop') {
                    window.location.href = '/trusted_sellers/abex.html';
                } else {
                    window.location.href = `product-details.html?productId=${productId}`;
                }
            }
        });
    });
}

// Get favorites from localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Save favorites to localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to safely get image URL with fallback
function getSafeImageUrl(imageUrl, fallbackUrl = 'images/placeholder.png') {
    if (!imageUrl || typeof imageUrl !== 'string') {
        return fallbackUrl;
    }
    return imageUrl;
}

// Load product details on detail page
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const product = productDatabase[productId];

    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    // Update text content (keeping existing text content updates...)
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productCondition').textContent = product.condition;
    document.getElementById('detailedDescription').textContent = product.detailedDescription;
    document.getElementById('productLocation').textContent = product.location;
    document.getElementById('sellerName').textContent = product.seller.name;
    document.getElementById('lastActive').textContent = product.seller.lastActive;

    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (mainImage && product.images && product.images.length > 0) {
        const mainImageUrl = product.images[0];
        mainImage.src = mainImageUrl;
        mainImage.alt = product.name;
        mainImage.onerror = () => {
            console.error('Failed to load main image');
            mainImage.src = 'images/placeholder.png';
        };
    }

    // Update seller image
    const sellerImage = document.getElementById('sellerImage');
    if (sellerImage && product.seller.image) {
        sellerImage.src = product.seller.image;
        sellerImage.alt = product.seller.name;
        sellerImage.onerror = () => sellerImage.src = 'images/profile-placeholder.png';
    }

    // Update thumbnail images
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    if (thumbnailContainer && product.images) {
        thumbnailContainer.innerHTML = ''; // Clear existing thumbnails
        
        product.images.forEach((imageUrl, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.className = 'thumbnail';
            thumbnail.src = imageUrl;
            thumbnail.alt = `${product.name} - Thumbnail ${index + 1}`;
            thumbnail.onclick = () => changeImage(index);
            thumbnail.onerror = () => {
                console.error(`Failed to load thumbnail ${index + 1}`);
                thumbnail.src = 'images/placeholder.png';
            };
            thumbnailContainer.appendChild(thumbnail);
        });
    }

    // Update favorite button
    const favorites = getFavorites();
    const isFavorite = favorites.some(fav => fav.id === productId);
    const favoriteBtn = document.querySelector('.favorite-btn img');
    if (favoriteBtn) {
        favoriteBtn.src = isFavorite ? 'images/heart-filled.png' : 'images/heart.png';
    }
}

// Toggle favorite status
function toggleFavorite() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const product = productDatabase[productId];

    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    const favorites = getFavorites();
    const existingIndex = favorites.findIndex(fav => fav.id === productId);
    const favoriteBtn = document.querySelector('.favorite-btn img');

    if (existingIndex === -1) {
        // Add to favorites - match the structure from the product page
        const favoriteProduct = {
            id: productId,
            name: product.name,
            price: product.price,
            description: product.description,
            condition: product.condition,
            location: product.location,
            image: product.images[0], // Store the first image as 'image'
            images: product.images, // Also store the full images array
            userimage: product.seller.image, // Match the product page structure
            sellername: product.seller.name, // Match the product page structure
            listingtime: product.seller.lastActive, // Match the product page structure
            seller: {
                name: product.seller.name,
                image: product.seller.image,
                lastActive: product.seller.lastActive
            }
        };
        
        favorites.push(favoriteProduct);
        if (favoriteBtn) {
            favoriteBtn.src = 'images/heart-filled.png';
        }
        showMessage(`${product.name} added to favorites!`);
    } else {
        // Remove from favorites
        favorites.splice(existingIndex, 1);
        if (favoriteBtn) {
            favoriteBtn.src = 'images/heart.png';
        }
        showMessage(`${product.name} removed from favorites!`, false);
    }

    saveFavorites(favorites);
    updateNotificationDot();
    updateNotificationBell();
}

// Function to render all favorites
function renderFavorites() {
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) return;

    const favorites = getFavorites();

    if (favorites.length === 0) {
        favoritesContainer.innerHTML = `
            <p class="center-message">
                No favorite items yet. Start shopping now!
                <img src="images/shopping-cart.png" alt="Shopping Cart" class="cart-icon">
            </p>
        `;
        return;
    }

    favoritesContainer.innerHTML = '';

    favorites.forEach(item => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-product-id', item.id);

        // Safely handle all possible image scenarios
        const mainImage = item.images && item.images.length > 0 ? item.images[0] : 
                         item.image ? item.image : 'images/placeholder.png';
        const sellerImage = item.seller && item.seller.image ? item.seller.image :
                           item.userimage ? item.userimage : 'images/profile-placeholder.png';

        productCard.innerHTML = `
            <div class="product-seller-info">
                <img src="${getSafeImageUrl(sellerImage)}" alt="Seller" class="product-user-icon" 
                     onerror="this.src='images/profile-placeholder.png'">
                <span class="product-seller-name">${item.seller?.name || item.sellername || 'Unknown Seller'}</span>
                <span class="listing-time">${item.seller?.lastActive || item.listingtime || 'Recently'}</span>
            </div>
            <img src="${getSafeImageUrl(mainImage)}" alt="${item.name}" class="product-main-image" 
                 onerror="this.src='images/placeholder.png'">
            <p class="product-name">${item.name || 'Untitled Product'}</p>
            <p class="product-description">${item.description || ''}</p>
            <p class="product-condition">${item.condition || ''}</p>
            <p class="product-price">${item.price || ''}</p>
            <button class="favorite-button" data-item-id="${item.id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="heart-icon" viewBox="0 0 24 24"
                     style="fill: red; stroke: red;"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            </button>
        `;

        // Add click handler for favorite button
        const favoriteButton = productCard.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const currentFavorites = getFavorites();
            const updatedFavorites = currentFavorites.filter(fav => fav.id !== item.id);
            saveFavorites(updatedFavorites);
            showNotification(`${item.name} removed from favorites`, 'error');
            renderFavorites();
        });

        // Add click handler for product navigation
        productCard.addEventListener('click', () => {
            if (item.id === "asusroggaminglaptop") {
                window.location.href = "trusted_sellers/abex.html";
            } else {
                window.location.href = `product-details.html?productId=${item.id}`;
            }
        });

        favoritesContainer.appendChild(productCard);
    });
}

// Helper function to show notification messages
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Helper function to show messages
function showMessage(message, success = true) {
    showNotification(message, success ? 'success' : 'error');
}

// Helper function to update notification dot
function updateNotificationDot() {
    const notificationDot = document.querySelector('.notification-dot');
    const favorites = getFavorites();
    
    if (notificationDot) {
        notificationDot.style.display = favorites.length > 0 ? 'block' : 'none';
    }
}

// Function to update the notification bell
function updateNotificationBell() {
    const notificationDot = document.querySelector('.notification-dot');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (notificationDot) {
        notificationDot.style.display = favorites.length > 0 ? 'block' : 'none';
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

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('product-details.html')) {
        loadProductDetails();
    } else if (currentPage.includes('favourites.html')) {
        renderFavorites();
    } else {
        initializeProductCards();
    }
});