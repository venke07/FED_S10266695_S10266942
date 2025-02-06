function openChat() {
    // TODO: Implement chat functionality
    console.log('Opening chat with seller...');
}

function toggleFavorite() {
    const button = document.querySelector('.favorite-btn img');
    if (button.src.includes('heart.png')) {
        button.src = 'images/heart-filled.png';
    } else {
        button.src = 'images/heart.png';
    }
}

function shareProduct() {
    // TODO: Implement share functionality
    console.log('Sharing product...');
}

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const product = productDatabase[productId];

    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    console.log('Loading product details for:', productId); // Debugging log

    // Set main product details
    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productCondition').textContent = product.condition;
    document.getElementById('detailedDescription').textContent = product.detailedDescription; // Ensure detailed description is set
    
    // Set seller information
    document.getElementById('sellerName').textContent = product.seller.name;
    document.getElementById('lastActive').textContent = `Last active: ${product.seller.lastActive}`;
    document.getElementById('sellerImage').src = product.seller.image;

    // Set main image and thumbnails
    const mainImage = document.getElementById('mainImage');
    mainImage.src = product.images[0];
    console.log('Main image set to:', product.images[0]); // Debugging log

    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        if (product.images[index]) {
            thumbnail.src = product.images[index];
            thumbnail.style.display = 'block';
            console.log('Thumbnail', index, 'set to:', product.images[index]); // Debugging log
        } else {
            thumbnail.style.display = 'none';
        }
    });
}

function changeImage(index) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const product = productDatabase[productId];
    
    if (product && product.images[index]) {
        const mainImage = document.getElementById('mainImage');
        mainImage.src = product.images[index];
        mainImage.style.height = '400px'; // Ensure consistent height
        console.log('Main image changed to:', product.images[index]); // Debugging log
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', loadProductDetails);