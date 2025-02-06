document.addEventListener('DOMContentLoaded', function() {
  // Get all filter elements
  const minPriceInput = document.getElementById('min-price');
  const maxPriceInput = document.getElementById('max-price');
  const priceApplyBtn = document.getElementById('price-apply');
  const categoryFilters = document.querySelectorAll('.category-filter');
  const conditionFilters = document.querySelectorAll('.condition-filter');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const productCards = document.querySelectorAll('.product-card');
  const filterToggleBtn = document.getElementById('filter-toggle-btn');
  const filterSection = document.querySelector('.filter-section');

  // Toggle filter section visibility
  filterToggleBtn.addEventListener('click', function() {
      if (filterSection.style.display === 'none' || !filterSection.style.display) {
          filterSection.style.display = 'block';
          filterToggleBtn.textContent = 'Hide Filters';
      } else {
          filterSection.style.display = 'none';
          filterToggleBtn.textContent = 'Filter By';
      }
  });

  // Function to parse price from product card
  function getProductPrice(card) {
      const priceText = card.querySelector('.product-price').textContent.trim();
      return parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0; // Remove any non-numeric characters
  }

  // Function to get product category
  function getProductCategory(card) {
      const name = card.querySelector('.product-name').textContent.toLowerCase();
      const description = card.querySelector('.product-description').textContent.toLowerCase();
      
      if (name.includes('laptop') || description.includes('laptop')) return 'laptop';
      if (name.includes('phone') || name.includes('iphone') || description.includes('phone')) return 'phone';
      if (name.includes('pc') || name.includes('desktop') || description.includes('pc')) return 'computer';
      if (name.includes('monitor') || name.includes('speaker') || name.includes('earbuds')) return 'accessories';
      return 'other';
  }

  // Function to get product condition
  function getProductCondition(card) {
      const conditionText = card.querySelector('.product-condition').textContent.toLowerCase();
      if (conditionText.includes('damaged')) return 'damaged';
      if (conditionText.includes('used')) return 'used';
      return 'new';
  }

  // Function to apply all filters
  function applyFilters(closeFilterSection = false) {
      const minPrice = minPriceInput.value ? parseFloat(minPriceInput.value) : 0;
      const maxPrice = maxPriceInput.value ? parseFloat(maxPriceInput.value) : Infinity;
      
      const selectedCategories = Array.from(categoryFilters)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.value);
      
      const selectedConditions = Array.from(conditionFilters)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.value);

      productCards.forEach(card => {
          const price = getProductPrice(card);
          const category = getProductCategory(card);
          const condition = getProductCondition(card);

          const meetsPrice = price >= minPrice && price <= maxPrice;
          const meetsCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
          const meetsCondition = selectedConditions.length === 0 || selectedConditions.includes(condition);

          if (meetsPrice && meetsCategory && meetsCondition) {
              card.style.display = 'block'; // Show the product
          } else {
              card.style.display = 'none'; // Hide the product
          }
      });

      // Only close the filter section when "Apply" or "Clear Filters" is clicked
      if (closeFilterSection) {
          filterSection.style.display = 'none';
          filterToggleBtn.textContent = 'Filter By';
      }
  }

  // Apply filters and close section only when clicking "Apply"
  priceApplyBtn.addEventListener('click', function() {
      applyFilters(true);
  });

  // Apply filters but keep section open when checking checkboxes
  categoryFilters.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          applyFilters(false);
      });
  });

  conditionFilters.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
          applyFilters(false);
      });
  });

  // Clear all filters and close the section
  clearFiltersBtn.addEventListener('click', function() {
      minPriceInput.value = '';
      maxPriceInput.value = '';
      categoryFilters.forEach(checkbox => checkbox.checked = false);
      conditionFilters.forEach(checkbox => checkbox.checked = false);
      productCards.forEach(card => card.style.display = 'block'); // Show all products

      // Close the filter section after clearing filters
      filterSection.style.display = 'none';
      filterToggleBtn.textContent = 'Filter By';
  });
});
