// Get username and display welcome message
const username = localStorage.getItem('username') || "Guest";
document.getElementById('welcome-message').textContent = `Welcome, ${username}`;

// Get the checkout total and balance from localStorage
const checkoutTotal = parseFloat(localStorage.getItem('checkoutTotal')) || 0;
const balance = parseFloat(localStorage.getItem('balance')) || 0;

const cartSummary = document.getElementById('cart-summary');
const totalPriceElement = document.getElementById('total-price');

// Function to render the cart summary
function renderCart() {
    if (checkoutTotal === 0) {
        cartSummary.innerHTML = '<p>Your cart is empty.</p>';
        totalPriceElement.textContent = '$0.00';
        return;
    }

    cartSummary.innerHTML = `
        <div class="cart-item">
            <p>Total Items</p>
            <p>$${checkoutTotal.toFixed(2)}</p>
        </div>
    `;
    totalPriceElement.textContent = `$${checkoutTotal.toFixed(2)}`;
}

// Handle the checkout form submission
document.getElementById('checkoutForm').addEventListener('submit', (event) => {
    event.preventDefault();

    if (balance < checkoutTotal) {
        alert("Not enough money.");
        return;
    }

    const newBalance = balance - checkoutTotal;
    localStorage.setItem('balance', newBalance.toFixed(2)); // Update balance in localStorage
    localStorage.removeItem('cart'); // Clear the cart
    localStorage.removeItem('checkoutTotal'); // Clear the checkout total

    alert(`Thank you for your order! Remaining balance: $${newBalance.toFixed(2)}`);
    window.location.href = 'cart.html'; // Redirect to the cart page
});

// Render the cart summary on page load
renderCart();

