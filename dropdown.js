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
  });
  



// Array of image URLs i
// Array of image URLs
const images = [
  "images/headbanner.jpg", // First banner image
  "images/laptop(2).avif", // Second banner image
  "images/laptop(3).jpg"  // Third banner image
];

let currentIndex = 0;

// Get elements
const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dotsContainer");

// Create dots for each image
images.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active"); // Mark the first dot as active
  dot.addEventListener("click", () => switchImage(index)); // Add click event to each dot
  dotsContainer.appendChild(dot);
});

// Update the active dot
function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// Switch to a specific image
function switchImage(index) {
  currentIndex = index;
  carouselImage.src = images[currentIndex];
  updateDots();
}

// Show the previous image
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  carouselImage.src = images[currentIndex];
  updateDots();
});

// Show the next image
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  carouselImage.src = images[currentIndex];
  updateDots();
});


