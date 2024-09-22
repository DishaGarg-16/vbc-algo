// public/js/user.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle Wishlist Button Clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-to-wishlist')) {
            const productId = e.target.getAttribute('data-id');
            addToWishlist(productId);
        }
    });

    // Handle Cart Management
    const cartForm = document.querySelector('.cart-form');
    if (cartForm) {
        cartForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(cartForm);
            fetch('/user/api/cart/update', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cart updated successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to update cart.');
                }
            })
            .catch(error => console.error('Error updating cart:', error));
        });
    }
});

/**
 * Adds a product to the wishlist via AJAX
 * @param {string} productId - The ID of the product to add
 */
function addToWishlist(productId) {
    fetch('/user/api/wishlist/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product added to wishlist!');
            // Optionally, update the wishlist count
            updateWishlistCount(data.wishlistCount);
        } else {
            alert('Failed to add product to wishlist.');
        }
    })
    .catch(error => console.error('Error adding to wishlist:', error));
}

/**
 * Updates the wishlist count in the header
 * @param {number} count - The new wishlist count
 */
function updateWishlistCount(count) {
    const wishlistLink = document.querySelector('.nav ul li a[href="/wishlist"]');
    if (wishlistLink) {
        wishlistLink.innerHTML = `<i class="fas fa-heart"></i> Wishlist (${count})`;
    }
}
