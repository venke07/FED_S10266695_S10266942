document.addEventListener('DOMContentLoaded', async function() {
  const apiUrl = 'https://devassignmentven-57f7.restdb.io/rest/listings';
  const apiKey = '6788f0bf7cf4e11f6418ad94';
  const listingsGrid = document.getElementById('listingsGrid');

  async function fetchListings() {
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': apiKey
        }
      });

      if (response.ok) {
        const listings = await response.json();
        console.log('Fetched listings:', listings); // Debugging log
        displayListings(listings);
      } else {
        console.error('Error fetching listings:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  }

  function displayListings(listings) {
    listingsGrid.innerHTML = '';

    listings.forEach(listing => {
      const listingElement = document.createElement('div');
      listingElement.className = 'listing';

      const imagesHtml = listing.imageUrls.map(url => `<img src="${url}" alt="${listing.name}" style="width: 100%; height: auto;">`).join('');
      console.log('Images HTML:', imagesHtml); // Debugging log

      listingElement.innerHTML = `
        <div class="listing-info">
          <div class="seller-info">
            <img src="../images/profile.png" alt="Seller Profile" class="seller-profile">
            <p><strong>Seller:</strong> ${listing.username || 'Unknown'}</p>
          </div>
          <h3>${listing.name}</h3>
          <p><strong>Category:</strong> ${listing.category}</p>
          <p><strong>Condition:</strong> ${listing.condition}</p>
          <p><strong>Price:</strong> $${listing.price}</p>
          <p><strong>Description:</strong> ${listing.description}</p>
          <p><strong>Location:</strong> ${listing.location}</p>
        </div>
        <div class="listing-images">
          ${imagesHtml}
        </div>
      `;

      listingElement.addEventListener('click', () => {
        window.location.href = `../posting-details/postdetails.html?id=${listing._id}`;
      });

      listingsGrid.appendChild(listingElement);
    });
  }

  fetchListings();
});
