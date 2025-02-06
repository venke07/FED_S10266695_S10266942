document.addEventListener('DOMContentLoaded', function () {
    // Select all dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
  
    // Loop over all dropdowns
    dropdowns.forEach(function (dropdown) {
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  
      // Show dropdown on hover
      dropdown.addEventListener('mouseenter', function () {
        dropdownMenu.style.display = 'block';
      });
  
      // Hide dropdown when mouse leaves
      dropdown.addEventListener('mouseleave', function () {
        dropdownMenu.style.display = 'none';
      });
  
      // Add hover listeners to the dropdown menu itself
      if (dropdownMenu) {
        dropdownMenu.addEventListener('mouseenter', function () {
          dropdownMenu.style.display = 'block';
        });
  
        dropdownMenu.addEventListener('mouseleave', function () {
          dropdownMenu.style.display = 'none';
        });
      }
    });

    // Array of image URLs - update these with your actual image paths
    const images = [
      "images/welcomebanerr.jpg",
      "images/laptop(2).avif",
      "images/laptop(3).jpg"
    ];
  
    let currentIndex = 0;
    let isTransitioning = false;
    
    // Get carousel elements
    const carouselImage = document.getElementById("carouselImage");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("dotsContainer");
  
    // Create dots for each image
    images.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      if (index === 0) dot.classList.add("active");
      dot.addEventListener("click", () => {
        if (!isTransitioning) switchImage(index);
      });
      dotsContainer.appendChild(dot);
    });
  
    // Update active dot
    function updateDots() {
      const dots = document.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }
  
    // Switch to specific image with transition
    function switchImage(index) {
      if (isTransitioning || index === currentIndex) return;
      
      isTransitioning = true;
      currentIndex = index;
      
      // Add fade-out effect
      carouselImage.style.opacity = '0';
      
      setTimeout(() => {
        carouselImage.src = images[currentIndex];
        // Add fade-in effect
        carouselImage.style.opacity = '1';
        updateDots();
        
        setTimeout(() => {
          isTransitioning = false;
        }, 500);
      }, 500);
    }
  
    // Previous button click handler
    prevBtn.addEventListener("click", () => {
      if (!isTransitioning) {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        switchImage(newIndex);
      }
    });
  
    // Next button click handler
    nextBtn.addEventListener("click", () => {
      if (!isTransitioning) {
        const newIndex = (currentIndex + 1) % images.length;
        switchImage(newIndex);
      }
    });
  
    // Auto-rotate images
    let autoRotateInterval = setInterval(() => {
      if (!isTransitioning) {
        const newIndex = (currentIndex + 1) % images.length;
        switchImage(newIndex);
      }
    }, 5000);
  
    // Pause auto-rotation when hovering over carousel
    const promoBanner = document.querySelector('.promo-banner');
    promoBanner.addEventListener('mouseenter', () => {
      clearInterval(autoRotateInterval);
    });
  
    promoBanner.addEventListener('mouseleave', () => {
      autoRotateInterval = setInterval(() => {
        if (!isTransitioning) {
          const newIndex = (currentIndex + 1) % images.length;
          switchImage(newIndex);
        }
      }, 5000);
    });
  
    // Initial load
    carouselImage.src = images[0];
  });


