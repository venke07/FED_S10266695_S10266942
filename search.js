document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('.search-bar');
    const productCards = document.querySelectorAll('.product-card');

    searchBar.addEventListener('input', () => {
        const searchTerm = searchBar.value.toLowerCase();

        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productDescription = card.querySelector('.product-description').textContent.toLowerCase();

            if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
