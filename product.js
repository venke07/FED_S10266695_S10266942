// Product database with all items
const productDatabase = {
    'asuslaptop': {
        id: 'asuslaptop',
        name: "Asus Laptop K413E",
        price: "$429.99",
        description: "High-performance laptop with sleek design",
        condition: "Brand New",
        detailedDescription: "The Asus Laptop K413E offers a high-performance experience with its powerful processor and sleek design. Perfect for both work and entertainment.",
        images: ["images/lenovo-lap.png", "images/lenovo-lap(2).png", "images/lenovo-lap(3).png"],
        seller: {
            name: "Tech Store",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'microsoftsurfacepro2': {
        id: 'microsoftsurfacepro2',
        name: "Microsoft Surface Pro 2",
        price: "$549.99",
        description: "Versatile 2-in-1 laptop with touch screen",
        condition: "Slightly Used",
        detailedDescription: "The Microsoft Surface Pro 2 is a versatile 2-in-1 laptop with a touch screen, perfect for both work and play. It offers high performance and portability.",
        images: ["images/laptop-product.png", "images/laptop-product(2).png", "images/laptop-product(3).png"],
        seller: {
            name: "Microsoft Store",
            image: "images/profile.png",
            lastActive: "1 hour ago"
        }
    },
    'iphone13128gbstarlight': {
        id: 'iphone13128gbstarlight',
        name: "Iphone 13. 128GB. Starlight",
        price: "$849.99",
        description: "Latest iPhone model with A15 Bionic chip",
        condition: "Brand New",
        detailedDescription: "The iPhone 13 in Starlight features a stunning design, advanced camera system, and powerful A15 Bionic chip for exceptional performance.",
        images: ["images/iphone.png", "images/iphone(2).png", "images/iphone(3).png"],
        seller: {
            name: "iStore",
            image: "images/profile.png",
            lastActive: "30 minutes ago"
        }
    },
    'retinamacbook': {
        id: 'retinamacbook',
        name: "Mid 2015 Retina MacBook Pro 15 2.5Ghz Dual Display",
        price: "$419.99",
        description: "High-resolution display with powerful performance",
        condition: "Slightly Used",
        detailedDescription: "The Mid 2015 Retina MacBook Pro offers a high-resolution display and powerful performance, making it ideal for professionals and creatives.",
        images: ["images/laptop-product(1).png", "images/laptop-product(1)(2).png", "images/laptop-product(1)(3).png"],
        seller: {
            name: "Apple Store",
            image: "images/profile.png",
            lastActive: "4 hours ago"
        }
    },
    'lenovoyogaslim7pro': {
        id: 'lenovoyogaslim7pro',
        name: "Lenova Yoga Slim 7 Pro",
        price: "$800",
        description: "Ultra-slim laptop with powerful performance",
        condition: "Brand New",
        detailedDescription: "The Lenovo Yoga Slim 7 Pro is an ultra-slim laptop with powerful performance, ideal for professionals and creatives. It features a sleek design and long battery life.",
        images: ["images/laptop-product(2)(1).png", "images/laptop-product(2)(2).png", "images/laptop-product(2)(3).png"],
        seller: {
            name: "Lenovo Official",
            image: "images/profile.png",
            lastActive: "1 day ago"
        }
    },
    'samsunggalaxys23green': {
        id: 'samsunggalaxys23green',
        name: "Samsung Galaxy S23 Green",
        price: "$679.99",
        description: "Latest Samsung flagship with advanced camera system",
        condition: "Brand New",
        detailedDescription: "The Samsung Galaxy S23 in Green is the latest flagship smartphone with an advanced camera system, stunning display, and powerful performance.",
        images: ["images/phone-product.png", "images/phone-product(1).png", "images/phone-product(3).png"],
        seller: {
            name: "Samsung Store",
            image: "images/profile.png",
            lastActive: "5 hours ago"
        }
    },
    'gamingpc4060ryzen57600': {
        id: 'gamingpc4060ryzen57600',
        name: "FLASH DEAL 4060 + RYZEN 5 7600 Custom Gaming Pc",
        price: "$1360",
        description: "Custom built gaming PC with latest components",
        condition: "Brand New",
        detailedDescription: "This custom gaming PC features the latest components, including a 4060 GPU and Ryzen 5 7600 CPU, for an exceptional gaming experience.",
        images: ["images/computer-product.png", "images/computer-product(2).png", "images/computer-product(3).png"],
        seller: {
            name: "PC Builder Pro",
            image: "images/profile.png",
            lastActive: "3 hours ago"
        }
    },
    'mechanicalkeyboard': {
        id: 'mechanicalkeyboard',
        name: "60% Mechanical Keyboard",
        price: "$23.93",
        description: "Compact mechanical keyboard with customizable keys",
        condition: "Slightly Used",
        detailedDescription: "This 60% mechanical keyboard offers a compact design with customizable keys, perfect for gamers and typists who need a reliable and responsive keyboard.",
        images: ["images/keyboard.png", "images/keyboard(2).png"],
        seller: {
            name: "Tech Gadgets",
            image: "images/profile.png",
            lastActive: "1 hour ago"
        }
    },
    'customgamingpcgtxrtx': {
        id: 'customgamingpcgtxrtx',
        name: "Custom Desktop Gaming PC Building Intel Core AMD Ryzen GeForce GTX RTX",
        price: "$658",
        description: "Customizable gaming PC with various configuration options",
        condition: "Brand New",
        detailedDescription: "Build your own custom desktop gaming PC with options for Intel Core, AMD Ryzen, and GeForce GTX or RTX graphics cards. Tailor it to your needs.",
        images: ["images/computer-product(2)(1).png"],
        seller: {
            name: "PC Custom Works",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'asusroggaminglaptop': {
        id: 'asusroggaminglaptop',
        name: "20Hz RGB 15.6\" ASUS ROG GAMING",
        price: "$590",
        description: "High refresh rate gaming laptop with RGB features",
        condition: "Brand New",
        detailedDescription: "The ASUS ROG Gaming laptop features a high refresh rate of 20Hz and RGB lighting, providing an immersive gaming experience with top-notch performance.",
        images: ["images/laptopproduct(4).png", "images/laptopproduct(4).png", "images/laptopproduct(4).png"],
        seller: {
            name: "ASUS Store",
            image: "images/profile.png",
            lastActive: "3 hours ago"
        }
    },
    'lgmonitor': {
        id: 'lgmonitor',
        name: "LG Monitor",
        price: "$89.99",
        description: "High-quality display monitor for work and gaming",
        condition: "Slightly Used",
        detailedDescription: "The LG Monitor offers a high-quality display for both work and gaming, with vibrant colors and sharp details. Perfect for any setup.",
        images: ["images/pc-product.png", "images/pc-product(2).png", "images/pc-product(3).png"],
        seller: {
            name: "LG Official",
            image: "images/profile.png",
            lastActive: "6 hours ago"
        }
    },
    'earbuds': {
        id: 'earbuds',
        name: "Earpeac3 bluetooth earbuds",
        price: "$109.99",
        description: "High-quality bluetooth earbuds with noise cancellation",
        condition: "Brand New",
        detailedDescription: "These Earpeac3 bluetooth earbuds offer high-quality sound with noise cancellation, making them perfect for listening to music or taking calls on the go.",
        images: ["images/earbuds.png", "images/earbuds(2).png", "images/earbuds(3).png"],
        seller: {
            name: "Audio Store",
            image: "images/profile.png",
            lastActive: "4 hours ago"
        }
    },
    'iphone13mini': {
        id: 'iphone13mini',
        name: "Iphone 13 Mini",
        price: "$398",
        description: "Compact iPhone with powerful features",
        condition: "Brand New",
        detailedDescription: "The iPhone 13 Mini packs powerful features into a compact design, including a stunning display, advanced camera system, and A15 Bionic chip.",
        images: ["images/phone-product(2)(1).png", "images/phone-product(2)(2).png", "images/phone-product(2)(3).png"],
        seller: {
            name: "John Doe",
            image: "images/profile.png",
            lastActive: "5 hours ago"
        }
    },
    'iphone14minibluedamaged': {
        id: 'iphone14minibluedamaged',
        name: "Iphone 14 Mini Blue - Damaged Screen",
        price: "$359.99",
        description: "iPhone 14 Mini with screen damage - for repair or parts",
        condition: "Damaged",
        detailedDescription: "This iPhone 14 Mini in Blue has a damaged screen but is perfect for repair or parts. It features the latest technology and a compact design.",
        images: ["images/phone-product(3)(1).png", "images/phone-product(3)(2).png", "images/phone-product(3)(3).png"],
        seller: {
            name: "Phone Parts",
            image: "images/profile.png",
            lastActive: "1 day ago"
        }
    },
    'gamingmouse': {
        id: 'gamingmouse',
        name: "Razer Basilisk V3 Ergonomic Customizable Gaming Mouse",
        price: "$78",
        description: "Ergonomic gaming mouse with customizable features",
        condition: "Brand New",
        detailedDescription: "The Razer Basilisk V3 is an ergonomic gaming mouse with customizable features, providing precision and comfort for long gaming sessions.",
        images: ["images/mouse.png"],
        seller: {
            name: "Gaming Gear",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'gamingpcryzen55600rtx3060': {
        id: 'gamingpcryzen55600rtx3060',
        name: "AMD Ryzen 5 5600 + Nvidia GeForce RTX 3060 - Slightly Used",
        price: "$675",
        description: "Used gaming PC in good condition",
        condition: "Slightly Used",
        detailedDescription: "This slightly used gaming PC features an AMD Ryzen 5 5600 CPU and Nvidia GeForce RTX 3060 GPU, providing excellent performance for gaming and more.",
        images: ["images/computer-product(3)(1).png", "images/computer-product(3)(2).png", "images/computer-product(3)(3).png"],
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



// Add click event listeners to all favorite buttons
document.querySelectorAll('.favorite-button').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop event propagation to prevent navigation

        const productCard = button.closest('.product-card');
        const productId = productCard.getAttribute('data-product-id');
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
            button.querySelector('.heart-icon').classList.add('filled');
            showMessage(`${productDetails.name} added to favorites!`);
        } else {
            // Remove from favorites
            favorites.splice(existingIndex, 1);
            button.querySelector('.heart-icon').classList.remove('filled');
            showMessage(`${productDetails.name} removed from favorites!`, false);
        }

        saveFavorites(favorites);
        updateNotificationDot();
    });
});

// Load product details on detail page
function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const product = productDatabase[productId];

    if (!product) {
        console.error('Product not found:', productId);
        return; // Remove redirect to index.html
    }

    // Create a map of element IDs and their corresponding data
    const elementMap = {
        'productName': product.name,
        'productPrice': product.price,
        'productDescription': product.description,
        'productCondition': product.condition,
        'sellerName': product.seller.name,
        'lastActive': product.seller.lastActive
    };

    // Update elements only if they exist
    for (const [id, value] of Object.entries(elementMap)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }

    // Handle detailed description
    const detailedDescriptionElement = document.getElementById('detailedDescription');
    if (detailedDescriptionElement && product.detailedDescription) {
        detailedDescriptionElement.textContent = product.detailedDescription;
    }

    // Handle images separately
    const mainImage = document.getElementById('mainImage');
    if (mainImage && product.images[0]) {
        mainImage.src = product.images[0];
    }

    const sellerImage = document.getElementById('sellerImage');
    if (sellerImage && product.seller.image) {
        sellerImage.src = product.seller.image;
    }

    // Handle thumbnails
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = ''; // Clear existing thumbnails
        product.images.forEach((img, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = img;
            thumbnail.className = 'thumbnail';
            thumbnail.onclick = () => changeImage(index);
            thumbnailContainer.appendChild(thumbnail);
        });
    }
}

// Change main image on thumbnail click
function changeImage(index) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const product = productDatabase[productId];
    const mainImage = document.getElementById('mainImage');
    if (mainImage && product && product.images[index]) {
        mainImage.src = product.images[index];
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('product-details.html')) {
        loadProductDetails();
    } else {
        initializeProductCards();
    }
});