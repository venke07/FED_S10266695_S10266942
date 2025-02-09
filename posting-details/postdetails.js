document.addEventListener('DOMContentLoaded', async function() {
  const apiUrl = 'https://devassignmentven-57f7.restdb.io/rest/listings';
  const apiKey = '6788f0bf7cf4e11f6418ad94';
  const listingDetails = document.getElementById('listingDetails');
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get('id');

  async function fetchListingDetails() {
    try {
      const response = await fetch(`${apiUrl}/${listingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': apiKey
        }
      });

      if (response.ok) {
        const listing = await response.json();
        console.log('Fetched listing details:', listing); // Debugging log
        displayListingDetails(listing);
      } else {
        console.error('Error fetching listing details:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  }

  function displayListingDetails(listing) {
    const imagesHtml = listing.imageUrls.map(url => `<img src="${url}" alt="${listing.name}" style="width: 100%; height: auto;">`).join('');
    console.log('Images HTML:', imagesHtml); // Debugging log

    listingDetails.innerHTML = `
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
        <div class="listing-images">
          ${imagesHtml}
        </div>
        <div class="action-buttons">
          <button class="like-btn">Like</button>
          <button class="chat-btn">Chat with Seller</button>
        </div>
      </div>
    `;

    document.querySelector('.like-btn').addEventListener('click', () => {
      alert('You liked this listing!');
    });

    document.querySelector('.chat-btn').addEventListener('click', () => {
      window.location.href = `../chat.html?user=${listing.username}`;
    });
  }

  fetchListingDetails();
});
