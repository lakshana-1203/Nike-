document.addEventListener('DOMContentLoaded', function() {
    // Product card click functionality
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Prevent triggering if clicking a specific CTA inside card (if added later)
            if (!e.target.classList.contains('hero-cta')) {
                const productName = this.querySelector('.product-name').textContent;
                const productPrice = this.querySelector('.product-price').textContent;
                
                // Show add to cart notification
                showNotification(`Added ${productName} (${productPrice}) to your cart`);
                
                // Update cart count
                const cartCount = document.querySelector('.cart-count');
                let count = parseInt(cartCount.textContent);
                cartCount.textContent = count + 1;
            }
        });
    });
    
    // Search functionality
    const searchBox = document.querySelector('.search-box');
    searchBox.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query !== '') {
                showNotification(`Searching for: "${query}"`);
                this.value = '';
            }
        }
    });
    
    // CTA button hover animation
    const ctaButtons = document.querySelectorAll('.hero-cta, .section-link');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Notification function
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #111;
            color: #fff;
            padding: 15px 25px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            animation: slideIn 0.3s ease-out;
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
});