document.addEventListener('DOMContentLoaded', function() {
  const fileUploadBox = document.querySelector('.file-upload');
  const fileInput = document.getElementById('fileInput');
  const itemForm = document.querySelector('.item-form');
  const previewImages = document.querySelector('.preview-images');
  const form = document.getElementById('itemDetailsForm');

  // Hide the form initially
  itemForm.style.display = 'none';

  // ImgBB API Key
  const imgbbApiKey = '735f40f916d2462f7d3a09f1d5b6ae58';

  // RestDB API Configuration
  const restdbApiUrl = 'https://devassignmentven-57f7.restdb.io/rest/listings';
  const restdbApiKey = '6788f0bf7cf4e11f6418ad94';

  // File Upload Handling
  function handleFileSelect(files) {
    if (files.length > 10) {
      alert('Maximum 10 files allowed');
      return false;
    }

    // Clear previous previews
    previewImages.innerHTML = '';

    // Create and display image previews
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          previewImages.appendChild(img);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please upload only image files (JPG, PNG, or WEBP)');
        return false;
      }
    });

    // Show the item form if at least one valid image was uploaded
    if (files.length > 0) {
      itemForm.style.display = 'block';
    }
    
    return true;
  }

  // Click to upload
  fileUploadBox.addEventListener('click', () => {
    fileInput.click();
  });

  // Handle file selection through input
  fileInput.addEventListener('change', (e) => {
    handleFileSelect(e.target.files);
  });

  // Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Create a unique ID for the listing
    const listingId = Date.now().toString();

    // Retrieve the username from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user ? user.username : 'Unknown';

    // Prepare listing data
    const listingData = {
      id: listingId,
      name: document.getElementById('itemName').value,
      category: document.getElementById('category').value,
      condition: document.getElementById('condition').value,
      price: document.getElementById('price').value,
      description: document.getElementById('description').value,
      location: document.getElementById('location').value || "N/A",
      username: username
    };

    // Handle image uploads to ImgBB
    const imageFiles = fileInput.files;
    const imagePromises = Array.from(imageFiles).map(file => {
      const formData = new FormData();
      formData.append('image', file);
      return fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => data.data.url);
    });

    try {
      // Wait for all images to be uploaded to ImgBB
      const imageUrls = await Promise.all(imagePromises);
      listingData.imageUrls = imageUrls; // Add image URLs to listing data

      // Save listing data to RestDB
      const response = await fetch(restdbApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': restdbApiKey
        },
        body: JSON.stringify(listingData)
      });

      if (response.ok) {
        alert('Item listed successfully!');
        resetForm();
      } else {
        throw new Error('Failed to save listing to RestDB');
      }
    } catch (error) {
      console.error('Error processing listing:', error);
      alert('Error creating listing');
    }
  });

  // Reset form and UI
  function resetForm() {
    form.reset();
    previewImages.innerHTML = '';
    itemForm.style.display = 'none';
    fileInput.value = '';
  }

  // Form Validation
  function validateForm() {
    const requiredFields = ['itemName', 'category', 'condition', 'price', 'description'];
    let isValid = true;

    requiredFields.forEach(field => {
      const input = document.getElementById(field);
      if (!input.value.trim()) {
        input.style.borderColor = '#ff4444';
        isValid = false;
      } else {
        input.style.borderColor = '#d9d9d9';
      }
    });

    if (!fileInput.files.length) {
      alert('Please upload at least one image');
      isValid = false;
    }

    return isValid;
  }

  // Price Input Validation
  const priceInput = document.getElementById('price');
  priceInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value < 0) {
      e.target.value = 0;
    }
  });
});
