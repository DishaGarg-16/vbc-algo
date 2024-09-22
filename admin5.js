// public/js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    // Handle Add Product Form Submission
    const addProductForm = document.querySelector('.add-product form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(addProductForm);
            fetch('/admin/api/products/add', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Product added successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to add product.');
                }
            })
            .catch(error => console.error('Error adding product:', error));
        });
    }

    // Handle Delete Product
    const deleteForms = document.querySelectorAll('.delete-form');
    deleteForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to delete this product?')) {
                const action = form.getAttribute('action');
                fetch(action, {
                    method: 'POST'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Product deleted successfully!');
                        window.location.reload();
                    } else {
                        alert('Failed to delete product.');
                    }
                })
                .catch(error => console.error('Error deleting product:', error));
            }
        });
    });
});
