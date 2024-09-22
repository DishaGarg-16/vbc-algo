// public/js/contact.js

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const message = contactForm.querySelector('#message').value.trim();

            if (name && email && message) {
                fetch('/contact/api/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, message })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Your message has been sent successfully!');
                        contactForm.reset();
                    } else {
                        alert('Failed to send your message. Please try again later.');
                    }
                })
                .catch(error => console.error('Error submitting contact form:', error));
            } else {
                alert('Please fill in all the fields.');
            }
        });
    }
});
