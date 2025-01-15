// Select the promo banner
const promoBanner = document.querySelector('.promo-banner');

// Image URL to show on hover
const hoverImageUrl = "images/running-shoes.png"; // Replace with your image URL
const defaultBackgroundColor = '#ddd';

// Add hover event to display the image
promoBanner.addEventListener('mouseover', () => {
    promoBanner.style.backgroundImage = `url(${hoverImageUrl})`;
    promoBanner.style.backgroundSize = '1200px 800px'; 
    promoBanner.style.backgroundPosition = 'center';
    promoBanner.style.backgroundRepeat = 'no-repeat'; 
  });
  

promoBanner.addEventListener('mouseout', () => {
  promoBanner.style.backgroundImage = '';
  promoBanner.style.backgroundColor = defaultBackgroundColor;
});
