// Product database with all items
const productDatabase = {
    'wirelessearbudspx8': {
        id: 'wirelessearbudspx8',
        name: "Wireless Earbuds, PX8",
        price: "$59.99",
        description: "High-quality wireless earbuds with premium sound",
        detailedDescription: "These wireless earbuds offer superior sound quality with noise cancellation and long battery life. Perfect for on-the-go listening.",
        images: ["images/lenovo-lap.png", "images/lenovo-lap.png", "images/lenovo-lap.png"],
        seller: {
            name: "Tech Store",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'airpodsmax': {
        id: 'airpodsmax',
        name: "AirPods Max",
        price: "$549.99",
        description: "Premium over-ear headphones with active noise cancellation",
        detailedDescription: "AirPods Max provide an unparalleled listening experience with high-fidelity audio, active noise cancellation, and a comfortable over-ear design.",
        images: ["images/laptop-product.png", "images/laptop-product.png", "images/laptop-product.png"],
        seller: {
            name: "Apple Store",
            image: "images/profile.png",
            lastActive: "1 hour ago"
        }
    },
    'iphone14128gbstarlight': {
        id: 'iphone14128gbstarlight',
        name: "Iphone 14. 128GB. Starlight",
        price: "$849.99",
        description: "Latest iPhone model with A15 Bionic chip",
        detailedDescription: "The iPhone 14 in Starlight features a stunning design, advanced camera system, and powerful A15 Bionic chip for exceptional performance.",
        images: ["images/iphone.png", "images/iphone.png", "images/iphone.png"],
        seller: {
            name: "iStore",
            image: "images/profile.png",
            lastActive: "30 minutes ago"
        }
    },
    'microsoftsurfacepro4': {
        id: 'microsoftsurfacepro4',
        name: "Microsoft Surface Pro 4",
        price: "$219.99",
        description: "Versatile 2-in-1 laptop with touch screen",
        detailedDescription: "The Microsoft Surface Pro 4 is a versatile 2-in-1 laptop with a touch screen, perfect for both work and play. It offers high performance and portability.",
        images: ["images/laptopproduct.png", "images/laptopproduct.png", "images/laptopproduct.png"],
        seller: {
            name: "MS Store",
            image: "images/profile.png",
            lastActive: "4 hours ago"
        }
    },
    'lenovoyogaslim7pro': {
        id: 'lenovoyogaslim7pro',
        name: "Lenova Yoga Slim 7 Pro",
        price: "$800",
        description: "Ultra-slim laptop with powerful performance",
        detailedDescription: "The Lenovo Yoga Slim 7 Pro is an ultra-slim laptop with powerful performance, ideal for professionals and creatives. It features a sleek design and long battery life.",
        images: ["images/laptopproduct(2).png", "images/laptopproduct(2).png", "images/laptopproduct(2).png"],
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
        detailedDescription: "The Samsung Galaxy S23 in Green is the latest flagship smartphone with an advanced camera system, stunning display, and powerful performance.",
        images: ["images/phoneproduct.png", "images/phoneproduct.png", "images/phoneproduct.png"],
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
        detailedDescription: "This custom gaming PC features the latest components, including a 4060 GPU and Ryzen 5 7600 CPU, for an exceptional gaming experience.",
        images: ["images/computerproduct.png", "images/computerproduct.png", "images/computerproduct.png"],
        seller: {
            name: "PC Builder Pro",
            image: "images/profile.png",
            lastActive: "3 hours ago"
        }
    },
    'bluetoothspeakerclock': {
        id: 'bluetoothspeakerclock',
        name: "Multifunctional Mini Blutooth Speaker/Clock",
        price: "$23.93",
        description: "2-in-1 bluetooth speaker with clock functionality",
        detailedDescription: "This multifunctional mini Bluetooth speaker also functions as a clock, offering great sound quality and a sleek design for any room.",
        images: ["images/galaxyclockproduct.png", "images/galaxyclockproduct.png", "images/galaxyclockproduct.png"],
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
        detailedDescription: "Build your own custom desktop gaming PC with options for Intel Core, AMD Ryzen, and GeForce GTX or RTX graphics cards. Tailor it to your needs.",
        images: ["images/computerproduct(2).png", "images/computerproduct(2).png", "images/computerproduct(2).png"],
        seller: {
            name: "PC Custom Works",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'lgmonitor': {
        id: 'lgmonitor',
        name: "LG Monitor",
        price: "$89.99",
        description: "High-quality display monitor for work and gaming",
        detailedDescription: "The LG Monitor offers a high-quality display for both work and gaming, with vibrant colors and sharp details. Perfect for any setup.",
        images: ["images/pcproductt.png", "images/pcproductt.png", "images/pcproductt.png"],
        seller: {
            name: "LG Official",
            image: "images/profile.png",
            lastActive: "6 hours ago"
        }
    },
    'laptopinstallmentscheme': {
        id: 'laptopinstallmentscheme',
        name: "Instalment* Flexible Payment Schemes on Eligible Laptops!",
        price: "$199.99",
        description: "Flexible payment options for premium laptops",
        detailedDescription: "Take advantage of flexible payment schemes on eligible laptops with our installment plans. Get the laptop you need without the upfront cost.",
        images: ["images/laptopproduct(3).png", "images/laptopproduct(3).png", "images/laptopproduct(3).png"],
        seller: {
            name: "Laptop Finance",
            image: "images/profile.png",
            lastActive: "4 hours ago"
        }
    },
    'iphone13mini': {
        id: 'iphone13mini',
        name: "Iphone 13 Mini",
        price: "$398",
        description: "Compact iPhone with powerful features",
        detailedDescription: "The iPhone 13 Mini packs powerful features into a compact design, including a stunning display, advanced camera system, and A15 Bionic chip.",
        images: ["images/phoneprodcut(3).png", "images/phoneprodcut(3).png", "images/phoneprodcut(3).png"],
        seller: {
            name: "Phone Hub",
            image: "images/profile.png",
            lastActive: "5 hours ago"
        }
    },
    'iphone14minibluedamaged': {
        id: 'iphone14minibluedamaged',
        name: "Iphone 14 Mini Blue - Damaged Screen",
        price: "$359.99",
        description: "iPhone 14 Mini with screen damage - for repair or parts",
        detailedDescription: "This iPhone 14 Mini in Blue has a damaged screen but is perfect for repair or parts. It features the latest technology and a compact design.",
        images: ["images/phoneproduct(4).png", "images/phoneproduct(4).png", "images/phoneproduct(4).png"],
        seller: {
            name: "Phone Parts",
            image: "images/profile.png",
            lastActive: "1 day ago"
        }
    },
    'asusroggaminglaptop': {
        id: 'asusroggaminglaptop',
        name: "20Hz RGB 15.6\" ASUS ROG GAMING",
        price: "$590",
        description: "High refresh rate gaming laptop with RGB features",
        detailedDescription: "The ASUS ROG Gaming laptop features a high refresh rate of 20Hz and RGB lighting, providing an immersive gaming experience with top-notch performance.",
        images: ["images/laptopproduct(4).png", "images/laptopproduct(4).png", "images/laptopproduct(4).png"],
        seller: {
            name: "ASUS Store",
            image: "images/profile.png",
            lastActive: "3 hours ago"
        }
    },
    'asusrogzephyrusg14': {
        id: 'asusrogzephyrusg14',
        name: "2024 Asus ROG Zephyrus G14",
        price: "$1888",
        description: "Latest model of the popular G14 gaming laptop",
        detailedDescription: "The 2024 Asus ROG Zephyrus G14 is the latest model of the popular gaming laptop, offering powerful performance, a sleek design, and advanced features.",
        images: ["images/laptopproduct(5).png", "images/laptopproduct(5).png", "images/laptopproduct(5).png"],
        seller: {
            name: "ROG Official",
            image: "images/profile.png",
            lastActive: "2 hours ago"
        }
    },
    'gamingpcryzen55600rtx3060': {
        id: 'gamingpcryzen55600rtx3060',
        name: "AMD Ryzen 5 5600 + Nvidia GeForce RTX 3060 - Slightly Used",
        price: "$675",
        description: "Used gaming PC in good condition",
        detailedDescription: "This slightly used gaming PC features an AMD Ryzen 5 5600 CPU and Nvidia GeForce RTX 3060 GPU, providing excellent performance for gaming and more.",
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
            // Prevent navigation if clicking the favorite button
            if (event.target.closest('.favorite-button')) {
                event.stopPropagation();
                return;
            }

            const productId = card.getAttribute('data-product-id');
            if (productId) {
                window.location.href = `product-details.html?id=${productId}`;
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
    const productId = urlParams.get('id');
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
    const thumbnailContainer = document.querySelector('.thumbnails-container');
    if (thumbnailContainer) {
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
    const productId = urlParams.get('id');
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