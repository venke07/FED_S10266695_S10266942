// DOM Elements
const fileUploadBox = document.querySelector('.file-upload');
const fileInput = document.getElementById('fileInput');
const itemForm = document.querySelector('.item-form');
const previewImages = document.querySelector('.preview-images');
const form = document.getElementById('itemDetailsForm');

// Hide the form initially
itemForm.style.display = 'none';

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
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData();
    formData.append('name', document.getElementById('itemName').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('condition', document.getElementById('condition').value);
    formData.append('price', document.getElementById('price').value);
    formData.append('description', document.getElementById('description').value);
    
    // Append files
    Array.from(fileInput.files).forEach((file, index) => {
        formData.append(`image${index}`, file);
    });

    // Here you would typically send this data to your server
    // Example AJAX request (uncomment and modify when ready to use):
    /*
    fetch('/api/listings', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        resetForm();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error submitting form. Please try again.');
    });
    */

    // For development/testing:
    console.log('Form submitted with data:', Object.fromEntries(formData));
    alert('Item listed successfully!');
    resetForm();
});

// Reset form and UI
function resetForm() {
    form.reset();
    previewImages.innerHTML = '';
    itemForm.style.display = 'none';
    fileInput.value = '';
}

// Drag and Drop Handling
fileUploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadBox.style.backgroundColor = '#f0f0f0';
});

fileUploadBox.addEventListener('dragleave', () => {
    fileUploadBox.style.backgroundColor = '';
});

fileUploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadBox.style.backgroundColor = '';
    
    const files = Array.from(e.dataTransfer.files);
    if (handleFileSelect(files)) {
        // Manually set the files to the input
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
    }
});

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