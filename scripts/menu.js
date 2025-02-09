document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById("hamburger-menu");
    const navMenu = document.querySelector(".nav-menu");
  
    hamburger.addEventListener("click", function() {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  });
  