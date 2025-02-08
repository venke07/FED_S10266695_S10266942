document.addEventListener('DOMContentLoaded', function () {
  // Select all dropdowns
  const dropdowns = document.querySelectorAll('.dropdown');

  // Loop over all dropdowns
  dropdowns.forEach(function (dropdown) {
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    // Show dropdown on hover
    dropdown.addEventListener('mouseenter', function () {
      if (dropdownMenu) dropdownMenu.style.display = 'block';
    });

    // Hide dropdown when mouse leaves
    dropdown.addEventListener('mouseleave', function () {
      if (dropdownMenu) dropdownMenu.style.display = 'none';
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