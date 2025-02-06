// Glitch Text Effect
class GlitchText {
    constructor(element) {
        this.element = element;
        this.originalText = element.innerText;
        this.chars = '!<>-_\\/[]{}—=+*^?#_______';
        this.isGlitching = false;
        this.init();
    }

    init() {
        this.element.addEventListener('mouseover', () => this.startGlitch());
        this.element.addEventListener('mouseout', () => this.stopGlitch());
    }

    startGlitch() {
        if (this.isGlitching) return;
        this.isGlitching = true;
        let iterations = 0;
        
        const interval = setInterval(() => {
            this.element.innerText = this.originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return this.originalText[index];
                    }
                    return this.chars[Math.floor(Math.random() * this.chars.length)];
                })
                .join('');

            if (iterations >= this.originalText.length) {
                clearInterval(interval);
                this.element.innerText = this.originalText;
                this.isGlitching = false;
            }

            iterations += 1/3;
        }, 30);
    }

    stopGlitch() {
        this.element.innerText = this.originalText;
        this.isGlitching = false;
    }
}

// Initialize glitch effect
document.addEventListener('DOMContentLoaded', () => {
    const glitchElement = document.querySelector('.glitch-text');
    if (glitchElement) {
        new GlitchText(glitchElement);
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
        header.style.background = 'rgba(255, 255, 255, 0.98)';
    }
    
    lastScroll = currentScroll;
});

// Newsletter form submission
const newsletterForm = document.querySelector('.subscribe-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        // Add your newsletter subscription logic here
        alert('Thanks for subscribing!');
        newsletterForm.reset();
    });
}

// Product quick view
document.querySelectorAll('.product-card').forEach(card => {
    const quickView = card.querySelector('.hover-info');
    if (quickView) {
        quickView.addEventListener('click', () => {
            // Removed the alert message
        });
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('hero')) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    }
});

// Cart functionality
let cartCount = 0;
let cartTotal = 0;
const cartElement = document.querySelector('nav a[href="#cart"]');
let cartItems = [];

function updateCart() {
    if (cartElement) {
        cartElement.textContent = `Cart (${cartCount}) - SGD ${cartTotal.toFixed(2)}`;
    }
    renderCartPopup();
}

function addToCart(price, productName, productImage) {
    cartCount++;
    cartTotal += price;
    cartItems.push({ name: productName, price: price, image: productImage });
    updateCart();
    
    // Create animation element
    const cartAnimation = document.createElement('div');
    cartAnimation.classList.add('cart-animation');
    document.body.appendChild(cartAnimation);
    
    setTimeout(() => {
        cartAnimation.remove();
    }, 1000);
}

function renderCartPopup() {
    const cartPopup = document.querySelector('.cart-popup');
    if (cartPopup) {
        cartPopup.innerHTML = `
            <h3>Cart Items</h3>
            <ul>
                ${cartItems.map(item => `
                    <li>
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.name}</span>
                        <span>SGD ${item.price.toFixed(2)}</span>
                    </li>
                `).join('')}
            </ul>
            <button class="checkout-btn">Checkout</button>
        `;

        // Add event listener to the checkout button
        const checkoutButton = cartPopup.querySelector('.checkout-btn');
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                window.location.href = '/trusted_sellers/checkout.html';
            });
        }
    }
}

// Show cart popup
cartElement.addEventListener('click', (e) => {
    e.preventDefault();
    const cartPopup = document.querySelector('.cart-popup');
    if (cartPopup) {
        cartPopup.classList.toggle('visible');
    }
});

// Product add to cart
document.querySelectorAll('.product-card').forEach(card => {
    const addToCartButton = card.querySelector('.hover-info');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            const productName = card.querySelector('h3').innerText;
            let productPrice = parseFloat(card.querySelector('.price').innerText.replace('SGD ', '').split(' – ')[0]);
            if (productName === 'ABEX ZENUM 9 PLUS') {
                productPrice = 1888.00; 
            }
            const productImage = card.querySelector('img').src;
            addToCart(productPrice, productName, productImage);
            alert(`${productName} has been added to your cart.`);
        });
    }
});

// Initialize shop now buttons
document.querySelectorAll('.shop-now, .explore-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productSection = document.querySelector('#laptops');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});