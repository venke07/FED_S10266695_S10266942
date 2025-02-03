document.addEventListener('DOMContentLoaded', () => {
    // Create notification container if it doesn't exist
    if (!document.getElementById('notification-container')) {
      const notificationContainer = document.createElement('div');
      notificationContainer.id = 'notification-container';
      notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      `;
      document.body.appendChild(notificationContainer);
    }
  
    // Function to show notification
    window.showNotification = (message, type = 'info') => {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      
      notification.style.cssText = `
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 14px;
        border-radius: 5px;
        margin-bottom: 10px;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      `;
  
      // Append notification
      const container = document.getElementById('notification-container');
      container.appendChild(notification);
  
      // Fade in
      setTimeout(() => (notification.style.opacity = '1'), 10);
  
      // Auto-remove after 3 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    };
  });
  
  // Example usage:
  // showNotification('Welcome back!', 'success');
  // showNotification('Error processing payment', 'error');
  // showNotification('New message received', 'info');
  