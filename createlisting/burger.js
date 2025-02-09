document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burger-menu');
    const navbarMenu = document.querySelector('.navbar-menu'); 
    const headerIcons = document.querySelector('.header-icons'); 
    const menu = document.querySelector('.menu');

    if (burgerMenu && navbarMenu) {
        burgerMenu.addEventListener('click', function() {
            burgerMenu.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            menu.classList.toggle('active'); // Ensuring menu toggles
            if (headerIcons) {
                headerIcons.classList.toggle('active'); // Toggle icons inside menu
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('#burger-menu') && !event.target.closest('.navbar-menu')) {
            burgerMenu.classList.remove('active');
            navbarMenu.classList.remove('active');
            menu.classList.remove('active');
            if (headerIcons) {
                headerIcons.classList.remove('active');
            }
        }
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            burgerMenu.classList.remove('active');
            navbarMenu.classList.remove('active');
            menu.classList.remove('active');
            if (headerIcons) {
                headerIcons.classList.remove('active');
            }
        }
    });
});
