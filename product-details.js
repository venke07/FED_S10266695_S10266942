// Product card click handler
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function (event) {
            if (event.target.closest('.favorite-button')) {
                event.stopPropagation();
                return;
            }

            const productId = this.getAttribute('data-product-id');
            console.log("Clicked Product ID:", productId);

            if (productId === 'asusroggaminglaptop') {
                window.location.href = '/trusted_sellers/abex.html';
                return;
            } else if (productId) {
                window.location.href = `product-details.html?productId=${productId}`;
            }
        });
    });
});

function openChat() {
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

    console.log('Loading product details for:', productId);

    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productCondition').textContent = product.condition;
    document.getElementById('detailedDescription').textContent = product.detailedDescription;

    document.getElementById('sellerName').textContent = product.seller.name;
    document.getElementById('lastActive').textContent = `Last active: ${product.seller.lastActive}`;
    document.getElementById('sellerImage').src = product.seller.image;

    const mainImage = document.getElementById('mainImage');
    mainImage.src = product.images[0];
    mainImage.style.height = '500px'; // Ensure consistent height on page load
    console.log('Main image set to:', product.images[0]);

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        if (product.images[index]) {
            thumbnail.src = product.images[index];
            thumbnail.style.display = 'block';
            console.log('Thumbnail', index, 'set to:', product.images[index]);
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
        mainImage.style.height = '500px'; // Ensure consistent height when changing images
        console.log('Main image changed to:', product.images[index]);
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    if (currentPage.includes('product-details.html')) {
        loadProductDetails();
    }
});