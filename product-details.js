// Product database with all items
const productDatabase = {
    'wireless-earbuds-px8': {
        id: 'wireless-earbuds-px8',
        name: "Wireless Earbuds, PX8",
        price: "$59.99",
        description: "High-quality wireless earbuds with premium sound",
        images: ["images/lenovo-lap.png", "images/lenovo-lap.png", "images/lenovo-lap.png"],
        seller: {
            name: "Tech Store",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'airpods-max': {
        id: 'airpods-max',
        name: "AirPods Max",
        price: "$549.99",
        description: "Premium over-ear headphones with active noise cancellation",
        images: ["images/laptop-product.png", "images/laptop-product.png", "images/laptop-product.png"],
        seller: {
            name: "Apple Store",
            image: "images/profile.png",
            lastActive: "1 hour ago"
        }
    },
    'iphone-14-128gb-starlight': {
        id: 'iphone-14-128gb-starlight',
        name: "Iphone 14. 128GB. Starlight",
        price: "$849.99",
        description: "Latest iPhone model with A15 Bionic chip",
        images: ["images/iphone.png", "images/iphone.png", "images/iphone.png"],
        seller: {
            name: "iStore",
            image: "images/profile.png",
            lastActive: "30 minutes ago"
        }
    },
    'microsoft-surface-pro-4': {
        id: 'microsoft-surface-pro-4',
        name: "Microsoft Surface Pro 4",
        price: "$219.99",
        description: "Versatile 2-in-1 laptop with touch screen",
        images: ["images/laptopproduct.png", "images/laptopproduct.png", "images/laptopproduct.png"],
        seller: {
            name: "MS Store",
            image: "images/profile.png",
            lastActive: "4 hours ago"
        }
    },
    'lenovo-yoga-slim-7-pro': {
        id: 'lenovo-yoga-slim-7-pro',
        name: "Lenova Yoga Slim 7 Pro",
        price: "$800",
        description: "Ultra-slim laptop with powerful performance",
        images: ["images/laptopproduct(2).png", "images/laptopproduct(2).png", "images/laptopproduct(2).png"],
        seller: {
            name: "Lenovo Official",
            image: "images/profile.png",
            lastActive: "1 day ago"
        }
    },
    'samsung-galaxy-s23-green': {
        id: 'samsung-galaxy-s23-green',
        name: "Samsung Galaxy S23 Green",
        price: "$679.99",
        description: "Latest Samsung flagship with advanced camera system",
        images: ["images/phoneproduct.png", "images/phoneproduct.png", "images/phoneproduct.png"],
        seller: {
            name: "Samsung Store",
            image: "images/profile.png",
            lastActive: "5 hours ago"
        }
    },
    'gaming-pc-4060-ryzen-5-7600': {
        id: 'gaming-pc-4060-ryzen-5-7600',
        name: "FLASH DEAL 4060 + RYZEN 5 7600 Custom Gaming Pc",
        price: "$1360",
        description: "Custom built gaming PC with latest components",
        images: ["images/computerproduct.png", "images/computerproduct.png", "images/computerproduct.png"],
        seller: {
            name: "PC Builder Pro",
            image: "images/profile.png",
            lastActive: "3 hours ago"
        }
    },
    'bluetooth-speaker-clock': {
        id: 'bluetooth-speaker-clock',
        name: "Multifunctional Mini Blutooth Speaker/Clock",
        price: "$23.93",
        description: "2-in-1 bluetooth speaker with clock functionality",
        images: ["images/galaxyclockproduct.png", "images/galaxyclockproduct.png", "images/galaxyclockproduct.png"],
        seller: {
            name: "Tech Gadgets",
            image: "images/profile.png",
            lastActive: "1 hour ago"
        }
    },
    'custom-gaming-pc-gtx-rtx': {
        id: 'custom-gaming-pc-gtx-rtx',
        name: "Custom Desktop Gaming PC Building Intel Core AMD Ryzen GeForce GTX RTX",
        price: "$658",
        description: "Customizable gaming PC with various configuration options",
        images: ["images/computerproduct(2).png", "images/computerproduct(2).png", "images/computerproduct(2).png"],
        seller: {
            name: "PC Custom Works",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'lg-monitor': {
        id: 'lg-monitor',
        name: "LG Monitor",
        price: "$89.99",
        description: "High-quality display monitor for work and gaming",
        images: ["images/pcproductt.png", "images/pcproductt.png", "images/pcproductt.png"],
        seller: {
            name: "LG Official",
            image: "images/profile.png",
            lastActive: "6 hours ago"
        }
    },
    'laptop-installment-scheme': {
        id: 'laptop-installment-scheme',
        name: "Instalment* Flexible Payment Schemes on Eligible Laptops!",
        price: "$199.99",
        description: "Flexible payment options for premium laptops",
        images: ["images/laptopproduct(3).png", "images/laptopproduct(3).png", "images/laptopproduct(3).png"],
        seller: {
            name: "Laptop Finance",
            image: "images/profile.png",
            lastActive: "4 hours ago"
        }
    },
    'iphone-13-mini': {
        id: 'iphone-13-mini',
        name: "Iphone 13 Mini",
        price: "$398",
        description: "Compact iPhone with powerful features",
        images: ["images/phoneprodcut(3).png", "images/phoneprodcut(3).png", "images/phoneprodcut(3).png"],
        seller: {
            name: "Phone Hub",
            image: "images/profile.png",
            lastActive: "5 hours ago"
        }
    },
    'iphone-14-mini-blue-damaged': {
        id: 'iphone-14-mini-blue-damaged',
        name: "Iphone 14 Mini Blue - Damaged Screen",
        price: "$359.99",
        description: "iPhone 14 Mini with screen damage - for repair or parts",
        images: ["images/phoneproduct(4).png", "images/phoneproduct(4).png", "images/phoneproduct(4).png"],
        seller: {
            name: "Phone Parts",
            image: "images/profile.png",
            lastActive: "1 day ago"
        }
    },
    'asus-rog-gaming-20hz': {
        id: 'asus-rog-gaming-20hz',
        name: "20Hz RGB 15.6\" ASUS ROG GAMING",
        price: "$590",
        description: "High refresh rate gaming laptop with RGB features",
        images: ["images/laptopproduct(4).png", "images/laptopproduct(4).png", "images/laptopproduct(4).png"],
        seller: {
            name: "ASUS Store",
            image: "images/profile.png",
            lastActive: "3 hours ago"
        }
    },
    'asus-rog-zephyrus-g14-2024': {
        id: 'asus-rog-zephyrus-g14-2024',
        name: "2024 Asus ROG Zephyrus G14",
        price: "$1888",
        description: "Latest model of the popular G14 gaming laptop",
        images: ["images/laptopproduct(5).png", "images/laptopproduct(5).png", "images/laptopproduct(5).png"],
        seller: {
            name: "ROG Official",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'amd-ryzen-5-rtx-3060': {
        id: 'amd-ryzen-5-rtx-3060',
        name: "AMD Ryzen 5 5600 + Nvidia GeForce RTX 3060 - Slightly Used",
        price: "$675",
        description: "Used gaming PC in good condition",
        images: ["images/computerproduct(3).png", "images/computerproduct(3).png", "images/computerproduct(3).png"],
        seller: {
            name: "PC Resale Pro",
            image: "images/profile.png",
            lastActive: "7 hours ago"
        }
    }
};

// Initialize product cards on main page
function initializeProductCards() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.classList.contains('like-button')) {
                event.stopPropagation();
                // Handle like button click
                console.log('Like button clicked');
                return;
            }
            const productName = card.querySelector('.product-name').textContent;
            const productId = generateProductId(productName);
            window.location.href = `product-details.html?id=${productId}`;
        });
    });
}

// Generate product ID from name
function generateProductId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

// Load product details on detail page
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = productDatabase[productId];

    if (!product) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('productName').textContent = product.name;
    document.getElementById('productPrice').textContent = product.price;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('sellerName').textContent = product.seller.name;
    document.getElementById('lastActive').textContent = product.seller.lastActive;
    document.getElementById('sellerImage').src = product.seller.image;

    // Load images
    document.getElementById('mainImage').src = product.images[0];
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        if (product.images[index]) {
            thumb.src = product.images[index];
            thumb.style.display = 'block';
        } else {
            thumb.style.display = 'none';
        }
    });
}

// Change main image on thumbnail click
function changeImage(index) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const product = productDatabase[productId];
    document.getElementById('mainImage').src = product.images[index];
}

// Initialize based on current page
if (document.querySelector('.product-section')) {
    initializeProductCards();
} else if (document.querySelector('.product-container')) {
    loadProductDetails();
}